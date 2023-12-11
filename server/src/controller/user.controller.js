import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signUp = async (req, res) => {
  try {
    const { username, password, displayName, confirmPassword } = req.body;

    // 檢查是否有相同的使用者名稱。
    const checkUser = await userModel.findOne({ username });

    //回應一個 400 錯誤，並提供一條消息 "username already used"。
    if (checkUser)
      return responseHandler.badrequest(res, "username already used");

    if (confirmPassword !== password)
      return responseHandler.badrequest(res, "Confirm password not match");

    //如果使用者名稱唯一，創建一個新的 userModel 實例。
    const user = new userModel();

    user.displayname = displayName;
    user.username = username;
    //使用 userSchema.method 中的 setPassword 加密密碼。
    user.setPassword(password);

    await user.save();

    /*使用 jsonwebtoken.sign 生成一個 JWT
      其中包含使用者 ID (data: user.id)
      使用 process.env.TOKEN_SECRET 作為密鑰*/
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" } //設定過期時間為 24 小時。
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayname");

    if (!user) return responseHandler.badrequest(res, "User not exist");

    //驗證提交的密碼是否與資料庫中的密碼匹配。
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    /*使用 jsonwebtoken.sign 生成一個 JWT
      其中包含使用者 ID (data: user.id)
      使用 process.env.TOKEN_SECRET 作為密鑰*/
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" } //設定過期時間為 24 小時。
    );

    /*將數據發送回客戶端之前，將這些敏感資料的內容修改為 undefined
      目的是在不直接修改資料庫中的數據的情況下
      在回應中過濾掉不應該被公開的敏感資料。
      沒有 user.save() 所以不會修改到後端資料*/
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signIn,
  signUp,
  getInfo,
  updatePassword,
};
