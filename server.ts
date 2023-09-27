import "module-alias/register";
import express from "express";
import globalExpressMiddlewares from "./src/app/middlewares/globalExpressMiddlewears";
import connectDB from "./src/app/config/database";
import config from "./src/app/config";
import serverErrorMiddleware from "./src/app/middlewares/serverErrorMiddleware";
var cors = require("cors");

import userRouter from "./src/user/apis/v1/userRouter";
import postRouter from "./src/post/apis/v1/postRouter";
import notFoundMiddleware from "@/app/middlewares/notFoundMiddleware";

const app = express();
globalExpressMiddlewares(app, express);
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Type"],
  })
);
app.use((req) => console.log("req :>> ", req));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// error handling
app.use(serverErrorMiddleware);
app.use(notFoundMiddleware);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
