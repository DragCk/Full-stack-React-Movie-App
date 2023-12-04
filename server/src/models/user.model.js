import mongoose from "mongoose";
import modelOptions from "./models.options.js";
import crypto from "crypto";

//創建使用者的Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    displayname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    salt: {
      type: String,
      require: true,
      select: false,
    },
  },
  modelOptions //應用了 modelOptions 中定義的選項。
);

//將setPassword自定義，附加到 userSchema 的 methods 屬性上。
userSchema.methods.setPassword = function (password) {
  //生成一個16字節的隨機數組，並以十六進制形式表示。
  this.salt = crypto.randomBytes(16).toString("hex");

  //將密碼設置為下面散列後的值。
  this.password = crypto
    .pbkdf2Sync(
      //pbkdf2Sync()是Node.js 中用於對密碼進行散列的函數。
      password, //要加密的密碼。
      this.salt, //是上面生成的隨機鹽。
      1000, //迭代次數
      64, //是生成的密碼數據的位元組長度
      "sha512" //是散列算法。)
    )
    .toString("hex"); // 將生成的密碼數據轉換為十六進制字符串。;
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(
      password, //要加密的密碼。
      this.salt, //是上面生成的隨機鹽。
      1000, //迭代次數
      64, //是生成的密碼數據的位元組長度
      "sha512" //是散列算法。)
    )
    .toString("hex"); // 將生成的密碼數據轉換為十六進制字符串。;

  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
