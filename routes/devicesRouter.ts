import { Router } from "express";
import { addDevice, getDevices } from "../controllers/deviceController";

const deviceRouter = Router();

deviceRouter.get("/", getDevices);
deviceRouter.post("/", addDevice);

export default deviceRouter;
