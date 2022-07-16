"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = exports.getCurrentLocation = exports.postLocation = exports.saveNewLocationToDB = void 0;
const Location_1 = __importDefault(require("../models/Location"));
const saveNewLocationToDB = (obj) => __awaiter(void 0, void 0, void 0, function* () { return yield Location_1.default.create(obj); });
exports.saveNewLocationToDB = saveNewLocationToDB;
const postLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let location = yield (0, exports.saveNewLocationToDB)(req.body);
        res.status(200).json({
            status: true,
            data: location,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.postLocation = postLocation;
const getCurrentLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let busId = req.params.busId;
        console.log(busId);
        let location = yield Location_1.default.findOne({ bus: busId }).sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            data: location,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getCurrentLocation = getCurrentLocation;
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let busId = req.params.busId;
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;
        let results = yield Location_1.default.aggregate([
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
        res.status(200).json(Object.assign({ status: true }, results[0]));
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getLocation = getLocation;
//# sourceMappingURL=locationController.js.map