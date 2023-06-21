import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
  jwtSecret: process.env.JWT_SECRET || "yourSecretKey",
};
export default config;
