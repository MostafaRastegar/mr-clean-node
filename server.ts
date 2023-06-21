import express from "express";
import globalExpressMiddlewares from "./src/middlewares/globalExpressMiddlewears";
import connectDB from "./src/config/database";
import config from "./src/config";

import postRoutes from "./src/app/post/postRoutes";

const app = express();
globalExpressMiddlewares(app, express);
const router = express.Router();

app.post("/test", function (req, res) {
  // Without `express.json()`, `req.body` is undefined.
  console.log(`${req.body}`);
});

app.use("/api/blog-posts", postRoutes(router));

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
