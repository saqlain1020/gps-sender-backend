import { Router } from "express";
import { getCurrentLocation, postLocation, getLocation } from "../controllers/locationController";

const locationRouter = Router();

locationRouter.post("/", postLocation);
locationRouter.get("/:busId", getLocation);
locationRouter.get("/current/:busId", getCurrentLocation);

export default locationRouter;
