import mongoose from "mongoose";
import User from "./User";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    amount_cents: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    paymentTime: {
      type: Date,
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

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

orderSchema.pre("save", async function (next) {
  if (this.isModified("isPaid")) {
    if (this.isPaid) {
      const user = await User.findOne({ _id: this.user });
      if (!user) return;
      const subscribedDate = new Date(user.subscribedTill);
      if (subscribedDate < new Date()) {
        const date = new Date();
        date.setDate(date.getDate() + this.days);
        await user.update({ subscribedTill: date });
      } else {
        const date = new Date(subscribedDate);
        date.setDate(date.getDate() + this.days);
        await user.update({ subscribedTill: date });
      }
    }
  }
});

var Order = mongoose.model("Order", orderSchema);

export default Order;
