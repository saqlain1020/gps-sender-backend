import { Router } from "express";
import { addBus, getBusById, getBuses } from "../controllers/busController";

const busRouter = Router();

busRouter.get("/", getBuses);
busRouter.get("/:id", getBusById);
busRouter.post("/", addBus);

export default busRouter;
