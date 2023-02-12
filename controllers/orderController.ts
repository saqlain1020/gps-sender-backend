import { RequestHandler } from "express";
import Order from "../models/Order";
import { TransactionProcessedCallbackData } from "../types";
import APIFeatures from "../utils/apiFeatures";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    let orders = await new APIFeatures(Order.find(), req.query).limitFields().get();
    res.status(200).json({
      status: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const paymentProcessedCallback: RequestHandler = async (req, res) => {
  const transaction = req.body as TransactionProcessedCallbackData;
  if (transaction.obj.success) {
    const order = await Order.findOne({ orderId: transaction.obj.payment_key_claims.order_id });
    if (!order) return;
    order.isPaid = true;
    order.paymentTime = new Date(transaction.obj.created_at);
    await order?.save();
  }
};
