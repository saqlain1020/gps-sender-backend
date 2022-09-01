import { RequestHandler } from "express";
import Bus from "../models/Buses";
import Location from "../models/Location";
import APIFeatures from "../utils/apiFeatures";

export const getBuses: RequestHandler = async (req, res) => {
  try {
    let buses = await new APIFeatures(Bus.find(), req.query).limitFields().get();
    let promises: Promise<any>[] = [];
    console.log(buses)
    // @ts-ignore
    buses.forEach((item: any) => {
      // @ts-ignore
      promises.push(Location.findOne({ bus: item._id }).sort({ createdAt: -1 }));      
    });
    let ans = await Promise.all(promises);
    console.log(ans)
    buses = buses.map((item: any, i: number) => {
      console.log("it",item)
      return {
        ...item,
        location: ans[i].toJSON(),
      };
    });
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

export const deleteBus: RequestHandler = async (req, res) => {
  let { id } = req.body;
  let bus = await Bus.findByIdAndDelete(id);
  if (bus)
    res.status(200).json({
      status: true,
      bus,
    });
  else
    res.status(404).json({
      status: false,
      error: "Bus not found",
    });
  try {
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
