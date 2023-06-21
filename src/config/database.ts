import mongoose from "mongoose";
import config from "./index";
import logger from "@root/utils/logger";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.connect(config.mongoURI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;
