import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  //用於獲取請求中的驗證錯誤。這將檢查之前在路由中定義的驗證規則。
  const errors = validationResult(req);

  //用於檢查是否有任何錯誤。如果有錯誤，表示請求未通過驗證。
  if (!errors.isEmpty()) return res.status(400).json(errors.array()[0].msg);
};

export default { validate };
