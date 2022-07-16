"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Buses_1 = __importDefault(require("./Buses"));
const locationSchema = new mongoose_1.default.Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    bus: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: Buses_1.default,
        required: true,
    },
    senderIp: {
        type: String,
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
locationSchema.pre(/^find/, function (next) {
    this.populate({
        path: "bus",
    });
    next();
});
const Location = mongoose_1.default.model("Location", locationSchema);
exports.default = Location;
//# sourceMappingURL=Location.js.map