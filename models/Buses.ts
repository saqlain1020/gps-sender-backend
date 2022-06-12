import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const busSchema = new mongoose.Schema(
  {
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

var Bus = mongoose.model("Bus", busSchema);

export default Bus;
