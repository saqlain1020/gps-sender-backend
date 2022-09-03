import mongoose from "mongoose";
import Bus from "./Buses";

const deviceSchema = new mongoose.Schema(
  {
    mac: {
      type: String,
      required: true,
    },
    busId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Bus,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

var Device = mongoose.model("Device", deviceSchema);

export default Device;
