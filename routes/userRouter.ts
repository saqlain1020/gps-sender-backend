import { Router } from "express";
import { checkUsernameExist, getUser, login, protect, signup } from "../controllers/userController";
import { body, validationResult } from "express-validator";

const userRouter = Router();

userRouter.get("/", protect, getUser);
userRouter.post("/signup", body("email").isEmail(), signup);
userRouter.post("/login", body("email").isEmail(), login);
userRouter.get("/check-username", checkUsernameExist);

export default userRouter;
