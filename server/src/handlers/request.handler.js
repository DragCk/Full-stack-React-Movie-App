import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  //用於獲取請求中的驗證錯誤。
  const errors = validationResult(req);

  //用於檢查是否有任何錯誤。如果有錯誤，表示請求未通過驗證。
  if (!errors.isEmpty())
    return res.status(400).json({
      message: errors.array()[0].msg,
    });

  next();
};

export default { validate };
