// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true }, // e.g., "Tomatoes"
    productImage: { type: String, required: true }, // URL to the product image
    pricePerKg: { type: Number, required: true },
    stock: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    reviews: [
      {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
