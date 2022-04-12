import axios from "axios";
import {
  getAccessToken,
  getAuthType,
  getRefreshToken,
  setAccessToken,
} from "./utils";

const AuthInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

AuthInstance.interceptors.request.use(
  (config) => {
    const token: string | null = getAccessToken();
    const authType: string | null = getAuthType();
    if (token && authType) {
      config.headers!.authorization = token;
      config.headers!.authType = authType;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
AuthInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/user/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await AuthInstance.post(`/user/refresh-token`, {
            refreshToken: getRefreshToken(),
          });
          const access_token: string = rs.data.payload;
          setAccessToken(access_token);
          return AuthInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default AuthInstance;
