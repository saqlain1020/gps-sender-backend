import { Router } from "express";
import { getDevices } from "../controllers/deviceController";

const deviceRouter = Router();

deviceRouter.get("/", getDevices);

export default deviceRouter;
