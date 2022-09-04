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
exports.deleteDevice = exports.addDevice = exports.getDevices = void 0;
const Devices_1 = __importDefault(require("../models/Devices"));
const getDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let devices = yield Devices_1.default.find();
        res.status(200).json({
            status: true,
            data: devices,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getDevices = getDevices;
const addDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let device = yield Devices_1.default.create(req.body);
        res.status(200).json({
            status: true,
            data: device,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.addDevice = addDevice;
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let device = yield Devices_1.default.findOneAndDelete({ mac: req.body.mac });
        res.status(200).json({
            status: true,
            data: device,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deleteDevice = deleteDevice;
//# sourceMappingURL=deviceController.js.map