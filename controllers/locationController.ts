import { RequestHandler } from "express";
import Location from "../models/Location";
import APIFeatures from "../utils/apiFeatures";

export const saveNewLocationToDB = async (obj: any) => await Location.create(obj);

export const postLocation: RequestHandler = async (req, res) => {
  try {
    let location = await saveNewLocationToDB(req.body);
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
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let results = await Location.aggregate([
      // Find where bus is equal to busId (ObjectId)
      { $match: { $expr: { $eq: ["$bus", { $toObjectId: busId }] } } },
      {
        $lookup: {
          from: "buses",
          localField: "bus",
          foreignField: "_id",
          as: "bus",
        },
      },
      {
        // Changes bus array to bus object
        $unwind: {
          path: "$bus",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $facet: {
          metadata: [
            // Count the number of documents
            { $count: "count" },
            { $addFields: { totalPages: { $ceil: { $divide: ["$count", limit] } } } },
            { $addFields: { page: page } },
          ],
          // Selecting specific documents by pagination logic
          data: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
        },
      },
      {
        $project: {
          // Get total from the first element of the metadata array
          count: { $arrayElemAt: ["$metadata.count", 0] },
          totalPages: { $arrayElemAt: ["$metadata.totalPages", 0] },
          page: { $arrayElemAt: ["$metadata.page", 0] },
          length: { $size: "$data" },
          // Show data field
          data: 1,
        },
      },
    ]);
    res.status(200).json({
      status: true,
      ...results[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
