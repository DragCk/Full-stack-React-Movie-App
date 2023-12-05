import mongoose, { Schema } from "mongoose";
import modelOptions from "./models.options.js";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      username: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
      mediaRate: {
        type: Number,
        require: true,
      },
    },
    modelOptions
  )
);
