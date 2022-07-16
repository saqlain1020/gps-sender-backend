"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const routeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});
const busSchema = new mongoose_1.default.Schema({
    route: {
        type: [routeSchema],
        default: [],
    },
    name: {
        type: String,
        required: [true, "Name of bus is required."],
    },
    numberPlate: {
        type: String,
        required: [true, "Number plate is required."],
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
var Bus = mongoose_1.default.model("Bus", busSchema);
exports.default = Bus;
//# sourceMappingURL=Buses.js.map