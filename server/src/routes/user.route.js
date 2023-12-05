import express from "express";
import { body } from "express-validator";
import favoriteController from "../controller/favorite.controller.js";
import userController from "../controller/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import { Error } from "mongoose";

const router = express.Router();

router.post(
  "/singup",

  // 使用 express-validator 定義一些輸入參數的驗證規則
  body("username")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("username is required")
    .isLength({ min: 0 })
    .withMessage("username minimum 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      /*如果使用 throw new Error
      通常會選擇同步的方式中止驗證
      而如果使用 Promise.reject
      可以支援異步操作。*/
      if (user) return Promise.reject("username already exist");
    }),

  body("password")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters"),

  body("confirmPassword")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Confirm password is required")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be the same")
    .custom((value, { req }) => {
      if (value === req.body.password)
        throw new Error("ConfirmPassword not match");
      return true;
    }),

  body("displayName")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Displayname is required")
    .isLength({ min: 8 })
    .withMessage("displayName minimum 8 characters"),

  requestHandler.validate,
  userController.singUp
);

router.post(
  "/singin",
  // 使用 express-validator 定義一些輸入參數的驗證規則
  body("username")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Username is required")
    .isLength({ min: 0 })
    .withMessage("username minimum 8 characters"),

  body("password")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("Password minimum 8 characters"),

  requestHandler.validate,
  userController.singIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,

  body("password")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters"),

  body("newPassword")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword minimum 8 characters"),

  body("confirmNewPassword")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Confirm new password is required")
    .isLength({ min: 8 })
    .withMessage("Confirm new password minimum 8 characters")
    .custom((value, { req }) => {
      if (value === req.body.newPassword)
        throw new Error("Confirm new password not match");
      return true;
    }),

  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("newPassword is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("Media type invalid "),

  body("mediaId")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("mediaId is required")
    .isLength({ min: 8 })
    .withMessage("Media Id can not me empty"),

  body("mediaTitle")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Media Title is required"),

  body("mediaPoster")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Media Poster is required"),

  body("mediaRate")
    .exists() //表示確保請求中的參數存在（不為 undefined 或 null）。
    .withMessage("Media Rate is required"),

  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
