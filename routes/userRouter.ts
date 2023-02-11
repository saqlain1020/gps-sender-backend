import { Router } from "express";
import { checkUsernameExist, getUser, login, protect, signup } from "../controllers/userController";

const userRouter = Router();


userRouter.get("/", protect, getUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/check-username", checkUsernameExist);

export default userRouter;
