import { RequestHandler } from "express";
import Location from "../models/Location";
import APIFeatures from "../utils/apiFeatures";

export const saveNewLocationToDB = async (obj: any) => await Location.create(obj);

export const postLocation: RequestHandler = async (req, res) => {
  try {
    let location = await saveNewLocationToDB(req.body)
    res.status(200).json({
      status: true,
      data: location,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const getCurrentLocation: RequestHandler = async (req, res) => {
  try {
    let busId = req.params.busId;
    console.log(busId);
    let location = await Location.findOne({ bus: busId }).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      data: location,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const getLocation: RequestHandler = async (req, res) => {
  try {
    let busId = req.params.busId;
    console.log(busId);
    let locations = await new APIFeatures(Location.find({ bus: busId }), req.query).sort().get();
    res.status(200).json({
      status: true,
      length: locations.length,
      data: locations,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
