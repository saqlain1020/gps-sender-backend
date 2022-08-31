import { Router } from "express";
import { addBus, deleteBus, getBusById, getBuses } from "../controllers/busController";

const busRouter = Router();

busRouter.get("/", getBuses);
busRouter.delete("/", deleteBus);
busRouter.get("/:id", getBusById);
busRouter.post("/", addBus);

export default busRouter;
