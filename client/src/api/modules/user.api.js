import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

//定義使用者相關的 API 端點
const userEndpoints = {
  singin: "user/singin",
  singup: "user/singup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  singin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.singin, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  singup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.singup, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.singup, {
        password,
        newPassword,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
