import mongoose from "mongoose";
import Bus from "./Buses";

const deviceSchema = new mongoose.Schema(
  {
    mac: {
      type: String,
      required: true,
    },
    bus: {
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

deviceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bus",
  });
  next();
});

export default Device;
