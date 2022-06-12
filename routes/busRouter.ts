import { Router } from "express";
import { addBus, getBuses } from "../controllers/busController";

const busRouter = Router();

busRouter.get("/",getBuses)
busRouter.post("/",addBus)

export default busRouter;