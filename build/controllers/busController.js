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
exports.addBus = exports.getBusById = exports.getBuses = void 0;
const Buses_1 = __importDefault(require("../models/Buses"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const getBuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let buses = yield new apiFeatures_1.default(Buses_1.default.find(), req.query).limitFields().get();
        res.status(200).json({
            status: true,
            data: buses,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getBuses = getBuses;
const getBusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bus = yield Buses_1.default.findById(req.params.id);
        res.status(200).json({
            status: true,
            data: bus,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getBusById = getBusById;
const addBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bus = yield Buses_1.default.create(req.body);
        res.status(201).json({
            status: true,
            bus,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.addBus = addBus;
//# sourceMappingURL=busController.js.map