import mongoose from "mongoose";
import wphasher from "wordpress-hash-node";
import crypto from "crypto";
import { RESET_TOKEN_EXPIRES_IN_MINS } from "../utils/constants";
import { User as IUser } from "./../types/Schemas";

const userSchema = new mongoose.Schema<IUser,any,IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "user name is required!"],
      immutable: true,
      lower: true, // user@gmail.com & User@gmail.com //modification
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false, //security
    },
    email: {
      type: String,
      unique: true,
      sparse:true
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


userSchema.pre("save",  function (next) {
  if (!this.isModified("password") && !this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  this.username = this.username.toLowerCase();
  next();
});

userSchema.pre("save", async function (next) {
  //this -> document
  if (!this.isModified("password")) return next();
  
  var encryptedPassword = wphasher.HashPassword(this.password);
  // var encryptedPassword = await bcrypt.hash(this.password, 12); //number brute force attack
  this.password = encryptedPassword;
  next();
});
//model instance method -> this method will be available for all the documents created by this model
userSchema.methods.passwordVerification = async (password: string, hasedPassword: string) => {
  return wphasher.CheckPassword(password, hasedPassword);
  // return await bcrypt.compare(password, hasedPassword);
};

//password reset token generator
userSchema.methods.passwordResetTokenGenerator = function () {
  //this -> user document
  //generate random string of 32 bits
  var resetToken = crypto.randomBytes(32).toString("hex");
  //encrypt reset token
  var encryptedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  //save encrypted resettoken in user document
  this.passwordResetToken = encryptedResetToken;
  //set token expiry (10 min)
  this.passwordResetTokenExpiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRES_IN_MINS * 60 * 1000)
  //return non-encrypted reset token
  return resetToken;
};

const User = mongoose.model("User", userSchema);


export default User;
