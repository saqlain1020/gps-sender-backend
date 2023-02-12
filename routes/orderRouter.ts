import { Router } from "express";
import { getOrders, paymentProcessedCallback } from "../controllers/orderController";

const orderRouter = Router();

orderRouter.get("/",getOrders)
orderRouter.post("/callback/paymentprocessed", paymentProcessedCallback);

export default orderRouter;
