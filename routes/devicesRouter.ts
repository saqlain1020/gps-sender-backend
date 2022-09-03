import { Router } from "express";
import { addDevice, deleteDevice, getDevices } from "../controllers/deviceController";

const deviceRouter = Router();

deviceRouter.get("/", getDevices);
deviceRouter.post("/", addDevice);
deviceRouter.delete("/", deleteDevice);

export default deviceRouter;
