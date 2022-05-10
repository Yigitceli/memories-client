import axios from "axios";
import store from "./redux/store";
import { logOut } from "./redux/userSlice";
import {
  getAccessToken,
  getAuthType,
  getRefreshToken,
  setAccessToken,
} from "./utils";

const AuthInstance = axios.create({
  baseURL: "https://yigit-memories-backend.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const interceptor = (store: any) => {
  const { dispatch } = store;
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
      if (
        originalConfig.url !== "/user/login" &&
        err.response &&
        originalConfig.url !== "/user/refresh-token"
      ) {
        if (err.response.status === 401 && !originalConfig._retry) {
          try {
            const rs = await AuthInstance.post(`/user/refresh-token`, {
              refreshToken: getRefreshToken(),
            });
            const access_token: string = rs.data.payload;
            setAccessToken(access_token);
            return AuthInstance(originalConfig);
          } catch (_error) {
            document.location.replace("/auth");
            dispatch(logOut());
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default AuthInstance;
