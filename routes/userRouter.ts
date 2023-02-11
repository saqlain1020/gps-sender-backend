import { Router } from "express";
import { checkUsernameExist, getUser, login, protect, signup } from "../controllers/userController";
import { check } from "express-validator";
import { validationMiddleware } from "../libs/middlewares";

const userRouter = Router();

userRouter.get("/", protect, getUser);
userRouter.post(
  "/signup",
  [
    check("email").exists().withMessage("Email is a required field"),
    check("email").isEmail().withMessage("Email is invalid"),
  ],
  validationMiddleware,
  signup
);
userRouter.post(
  "/login",
  [
    check("email").exists().withMessage("Email is a required field"),
    check("email").isEmail().withMessage("Email is invalid"),
  ],
  validationMiddleware,
  login
);
userRouter.get("/check-username", checkUsernameExist);

export default userRouter;
