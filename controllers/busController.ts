import { RequestHandler } from "express";
import Bus from "../models/Buses";
import APIFeatures from "../utils/apiFeatures";

export const getBuses: RequestHandler = async (req, res) => {
  try {
     
    let buses = await new APIFeatures(Bus.find(), req.query).limitFields().get();
    console.log(req.query)
    res.status(200).json({
      buses,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error?.message,
    });
  }
};

export const addBus: RequestHandler = async (req, res) => {
  try {
    let bus = await Bus.create(req.body);
    res.status(201).json({
      bus,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      error: error?.message,
    });
  }
};
