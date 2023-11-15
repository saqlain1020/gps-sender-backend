import { Router } from "express";
import { addBus, deleteBus, getBusById, getBuses } from "../controllers/busController";
import { protect } from "../controllers/userController";

const busRouter = Router();

busRouter.get("/", getBuses);
busRouter.delete("/", protect, deleteBus);
busRouter.get("/:id", getBusById);
busRouter.post("/", addBus);

export default busRouter;
