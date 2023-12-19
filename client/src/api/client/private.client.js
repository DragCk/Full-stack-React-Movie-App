import axios from "axios";
import queryString from "query-string";

// const baseURL = "http://127.0.0.1:5000/api/v1/";
const baseURL =
  "https://full-stack-react-movie-app-dragcks-projects.vercel.app/api/v1/";

const privateClient = axios.create({
  baseURL,
  //對 URL 參數進行自定義的序列化處理
  paramsSerializer: {
    //使用 queryString 庫將參數序列化。
    encode: (params) => queryString.stringify(params),
  },
});

//設定 Request 攔截器，它在每次發送請求之前執行。
privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});

//設定了 Response 攔截器，它在每次收到響應之後執行。
privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
