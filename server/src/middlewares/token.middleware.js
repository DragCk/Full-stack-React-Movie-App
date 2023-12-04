import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    //從請求header中擷取 Authorization 。
    const bearerHeader = req.headers["authorization"];

    //如果存在 Authorization 提取出 token 部分。
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      //驗證 token，使用環境變數中的 TOKEN_SECRET 作為密鑰。
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  //表示驗證失敗，則使用 responseHandler.unauthorize 回應未授權的狀態碼。
  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };
