// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["buyer", "farmer"],
      required: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true }, // hash in real app
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    bio: { type: String },
    profilePic: {
      type: String,
      required: true,
      default: "",
    },
    billingAddress: {
      fullname: String,
      phone: String,
      street: String,
      city: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
