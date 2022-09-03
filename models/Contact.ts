import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    name: {
      type: String,
    },
    message: {
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

var Contact = mongoose.model("Contact", contactSchema);

export default Contact;
