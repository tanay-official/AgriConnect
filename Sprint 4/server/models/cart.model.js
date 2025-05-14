import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantityKg: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
// This schema defines a cart for a buyer, which contains an array of items.
