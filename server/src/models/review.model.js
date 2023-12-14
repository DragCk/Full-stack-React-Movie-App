import mongoose, { Schema } from "mongoose";
import modelOptions from "./models.options.js";

export default mongoose.model(
  "Review",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId, //用於表示 MongoDB 文檔的 _id 字段
        ref: "User", //表示這個 ObjectId 是對 "User" 模型的引用。
        require: true,
      },
      content: {
        type: String,
        require: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        require: true,
      },
      mediaId: {
        type: String,
        require: true,
      },
      mediaTitle: {
        type: String,
        require: true,
      },
      mediaPoster: {
        type: String,
        require: true,
      },
    },
    modelOptions
  )
);
