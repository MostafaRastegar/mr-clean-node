import express from "express";
import globalExpressMiddlewares from "./src/presentation/middlewares/globalExpressMiddlewears";
import connectDB from "./src/presentation/config/database";
import config from "./src/presentation/config";
import errorMiddleware from "@root/presentation/middlewares/errorMiddleware";

import postRoutes from "./src/presentation/routers/postRoutes";
import userRoutes from "./src/presentation/routers/userRoutes";

const app = express();
globalExpressMiddlewares(app, express);
const router = express.Router();

app.post("/test", function (req, res) {
  // Without `express.json()`, `req.body` is undefined.
  console.log(`${req.body}`);
});

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

// error handling
errorMiddleware(app);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
