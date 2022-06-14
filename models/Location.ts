import mongoose from "mongoose";
import Bus from "./Buses";

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

const Location = mongoose.model("Location", locationSchema);

export default Location;
