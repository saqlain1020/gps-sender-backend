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

export const addDevice: RequestHandler = async (req, res) => {
  try {
    let device = await Device.create(req.body);
    res.status(200).json({
      status: true,
      data: device,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const deleteDevice: RequestHandler = async (req, res) => {
  try {
    let device = await Device.findOneAndDelete({ mac: req.body.mac });
    res.status(200).json({
      status: true,
      data: device,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
