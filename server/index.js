import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
