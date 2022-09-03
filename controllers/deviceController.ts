import { RequestHandler } from "express";
import Device from "../models/Devices";

export const getDevices: RequestHandler = async (req, res) => {
  try {
    let devices = await Device.find();
    res.status(200).json({
      status: true,
      data: devices,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
