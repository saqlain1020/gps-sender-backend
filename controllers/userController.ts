import { RequestHandler, Response, Request as IRequest } from "express";
import APIFeatures from "../utils/apiFeatures";
import { COOKIE_EXPIRES_IN, JWT_WEB_SECRET } from "../utils/constants";
import User from "../models/User";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import { promisify } from "util";
import wphasher from "wordpress-hash-node";
import { User as IUser } from "../types/Schemas";

interface Request extends IRequest {
  user?: IUser;
}

const signJWT = (userId: string) => {
  // @ts-ignore
  return JWT.sign({ id: userId }, JWT_WEB_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user: Omit<IUser, "password">, res: Response) => {
  var token = signJWT(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + parseInt(COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "development" ? false : true, //this will only valid for HTTPS connection
    httpOnly: process.env.NODE_ENV === "development" ? false : true, //transfer only in http/https protocols
  });
  res.status(200).json({
    status: "success",
    token: token,
    user,
  });
};

export const signup: RequestHandler = async (req, res) => {
  try {
    //encryption
    var user = await User.create(req.body); //bson
    createAndSendToken(user, res);
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    var { email, password } = req.body;
    //check if user & email exits
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    //fetch user whose email is given
    var user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      throw new Error("Incorrect email or password");
    }
    //verify password
    //enceptyed ps === password
    var passwordVerified = await user.passwordVerification(password, user.password);
    if (!passwordVerified || !user) {
      throw new Error("Incorrect email or password");
    }

    // bson to json
    let { password: p, ...profile } = user.toJSON();

    // @ts-ignore
    createAndSendToken(profile, res);
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const protect: RequestHandler = async (req: Request, res, next) => {
  try {
    let token = "";
    // 1- fetch token from request header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") // authorization: Bearer {token}
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2- check if token exits
    if (!token) {
      return res.status(401).json({
        status: false,
        error: "please sign in!",
      });
    }
    // 3- verify
    // @ts-ignore
    const { id: userId, iat: tokenIssuedAt } = await promisify(JWT.verify)(token, JWT_WEB_SECRET); //converting callback function to async await method (promise)
    // 4- check if user exist in DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        error: "User belonging to this token does not exist!",
      });
    }
    // 5- check if user doesnt change password after signing token
    let passwordChangedAt = user.passwordChangedAt;
    if (passwordChangedAt) {
      let isPasswordChangedAfter = passwordChangedAt.getTime() > tokenIssuedAt * 1000;
      if (isPasswordChangedAfter) {
        return res.status(401).json({
          error: "Password has been changed, please login again!",
        });
      }
    }
    req.user = user;
    next();
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getUser: RequestHandler = async (req: Request, res) => {
  try {
    if (!req.user) throw new Error("User not found");
    let user = {
      ...req.user.toJSON(),
    };
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const checkUsernameExist: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    let username = req?.query?.username?.toLowerCase();
    let user = await User.findOne({ username });
    res.status(200).json({
      isAvailable: user ? false : true,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// exports.forgotPassword = async (req, res) => {
//   try {
//     var email = req.query.email.toLowerCase();
//     //1 - fetch user on the basis of email
//     var user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         status: "false",
//         error: "no user found!",
//       });
//     }
//     //2 - generate reset token
//     var resetToken = user.passwordResetTokenGenerator();
//     await user.save({ validateBeforeSave: false }); //saving already existing doc
//     //3 - send it to user's email
//     const msg = {
//       to: email, // Change to your recipient
//       from: process.env.SENDGRID_FROM_MAIL, // Change to your verified sender
//       subject: "Password Reset Email",
//       html: `please click to that link for changing your password, note that the link will expires in 10 min - <a href="http://localhost:3000/auth/change-password/${resetToken}">Click Here</a> http://localhost:3000/auth/change-password/${resetToken}`,
//     };
//     // await sgMail.send(msg);

//     let transporter = nodemailer.createTransport({
//       service: "Gmail",
//       // secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.GMAIL_FROM_MAIL, // generated ethereal user
//         pass: process.env.GMAIL_PASS, // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail(msg);

//     res.status(200).json({
//       status: true,
//       msg: "Reset token has been sent to the email",
//     });
//   } catch (error:any) {
//     return res.status(500).json({
//       status: false,
//       error: error.message,
//     });
//   }
// };

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    //get user on the basis of passwordResetToken
    var { token } = req.params;
    var { password, passwordConfirm } = req.body;
    var encryptedResetToken = crypto.createHash("sha256").update(token).digest("hex");
    var user = await User.findOne({
      passwordResetToken: encryptedResetToken,
      passwordResetTokenExpiresAt: { $gt: Date.now() },
    });
    //if user doesnt exist then send error in response
    if (!user) {
      return res.status(401).json({
        error: "token doesnt exist or has been expired!",
      });
    }
    //set user new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();
    createAndSendToken(user, res);
  } catch (error: any) {
    // await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
