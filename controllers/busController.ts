import { RequestHandler } from "express";
import Bus from "../models/Buses";
import APIFeatures from "../utils/apiFeatures";

export const getBuses: RequestHandler = async (req, res) => {
  try {
    let buses = await new APIFeatures(Bus.find(), req.query).limitFields().get();
    res.status(200).json({
      status: true,
      data: buses,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const getBusById: RequestHandler = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    res.status(200).json({
      status: true,
      data: bus,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const addBus: RequestHandler = async (req, res) => {
  try {
    let bus = await Bus.create(req.body);
    res.status(201).json({
      status: true,
      bus,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
