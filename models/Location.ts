import mongoose from "mongoose";
import Bus from "./Buses";
import Device from "./Devices";

const locationSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    bus: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Bus,
      required: true,
    },
    senderIp: {
      type: String,
    },
    mac: {
      type: String,
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

locationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bus",
  });
  next();
});

locationSchema.pre("save", function (next) {
  const device = Device.find({ mac: this.mac });
  // @ts-ignore
  if (device && device.bus._id === this.bus) {
    next();
  }
  throw new Error("Wrong Mac address for selected bus.");
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
