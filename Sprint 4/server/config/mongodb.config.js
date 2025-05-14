import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();
const mongodbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB successfully".bgCyan.black);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default mongodbConfig;
