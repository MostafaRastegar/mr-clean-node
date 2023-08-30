import express from "express";
import globalExpressMiddlewares from "@root/app/middlewares/globalExpressMiddlewears";
import connectDB from "@root/app/config/database";
import config from "./src/app/config";
import errorMiddleware from "@root/app/middlewares/errorMiddleware";

import userRouter from "@root/user/apis/v1/userRouter";
import postRouter from "@root/post/apis/v1/postRouter";

const app = express();
globalExpressMiddlewares(app, express);
const router = express.Router();

app.post("/test", function (req, res) {
  // Without `express.json()`, `req.body` is undefined.
  console.log(`${req.body}`);
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// error handling
errorMiddleware(app);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
