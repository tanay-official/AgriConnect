// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantityKg: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    address: {
      fullname: String,
      phone: String,
      street: String,
      city: String,
      postalCode: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
