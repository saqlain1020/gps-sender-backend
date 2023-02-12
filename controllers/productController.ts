import axios from "axios";
import { RequestHandler } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import { PAYMOB_API_KEY } from "../utils/constants";

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const buyProduct: RequestHandler = async (req, res) => {
  try {
    const days = req.body.days;
    // @ts-ignore
    const user = req.user;
    const product = await Product.findOne({ days });
    if (!product) throw new Error("Product not found");
    const token = await registerPayment(product.name, product.price, user.email, days, user.id);

    res.status(200).json({
      status: true,
      data: {
        product,
        iframe: `https://pakistan.paymob.com/api/acceptance/iframes/103909?payment_token=${token}`,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

const paymentAuthRequest = async () => {
  const res = await axios.post("https://pakistan.paymob.com/api/auth/tokens", { api_key: PAYMOB_API_KEY });
  return res.data.token as string;
};

const registerOrder = async (token: string, name: string, price: number) => {
  const res = await axios.post("https://pakistan.paymob.com/api/ecommerce/orders", {
    auth_token: token,
    delivery_needed: false,
    amount_cents: price * 100,
    items: [
      {
        name,
        amount_cents: price * 100,
        description: name,
        quantity: "1",
      },
    ],
  });
  return res.data as {
    id: number;
    delivery_needed: boolean;
    amount_cents: number;
    items: [
      {
        name: string;
        description: string;
        amount_cents: number;
        quantity: number;
      }
    ];
  };
};

const registerPayment = async (name: string, price: number, email: string, days: number, userId: string) => {
  const token = await paymentAuthRequest();
  const orderData = await registerOrder(token, name, price);
  const body = {
    auth_token: token,
    expiration: 3600,
    amount_cents: orderData.amount_cents,
    order_id: orderData.id,
    currency: "PKR",
    integration_id: "81574",
    billing_data: {
      first_name: "KU",
      last_name: "Point",
      street: "NA",
      building: "NA",
      floor: "NA",
      apartment: "NA",
      state: "NA",
      email,
      phone_number: "00000000000",
      postal_code: "NA",
      city: "NA",
      country: "NA",
    },
  };
  const res = await axios.post("https://pakistan.paymob.com/api/acceptance/payment_keys", body);
  await Order.create({
    orderId: orderData.id,
    amount_cents: orderData.amount_cents,
    isPaid: false,
    user: userId,
    days,
  });
  const paymentToken = res.data.token;
  return paymentToken;
};
