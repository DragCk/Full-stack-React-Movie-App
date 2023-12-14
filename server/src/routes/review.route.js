import express from "express";
import { body } from "express-validator";
import reviewController from "../controller/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  "/",
  tokenMiddleware.auth,

  body("mediaId")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("Media Id can not be empty"),

  body("content")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("Content can not be empty"),

  body("mediaType")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("newPassword is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("Media type invalid "),

  body("mediaTitle")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Media Title is required"),

  body("mediaPoster")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Media Poster is required"),

  requestHandler.validate,
  reviewController.create
);

router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
