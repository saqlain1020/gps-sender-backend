"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Buses_1 = __importDefault(require("./Buses"));
const deviceSchema = new mongoose_1.default.Schema({
    mac: {
        type: String,
        required: true,
    },
    bus: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: Buses_1.default,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
var Device = mongoose_1.default.model("Device", deviceSchema);
deviceSchema.pre(/^find/, function (next) {
    this.populate({
        path: "bus",
    });
    next();
});
exports.default = Device;
//# sourceMappingURL=Devices.js.map