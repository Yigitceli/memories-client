import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { IUserBody } from "./types";

export const setAccessToken = (accessToken: string): void => {
  window.localStorage.setItem("accessToken", accessToken);
};
export const setRefreshToken = (refreshToken: string): void => {
  window.localStorage.setItem("refreshToken", refreshToken);
};
export const getAccessToken = (): string | null => {
  return window.localStorage.getItem("accessToken");
};
export const getRefreshToken = (): string | null => {
  return window.localStorage.getItem("refreshToken");
};
export const setAuthType = (authType: string): void => {
  window.localStorage.setItem("authType", authType);
};
export const getAuthType = (): string | null => {
  return window.localStorage.getItem("authType");
};

export const googleSignIn = async (): Promise<IUserBody | null> => {
  try {
    const data = await signInWithPopup(auth, provider);
    const userBody: IUserBody = {
      userId: data.user.uid,
      email: data.user.email,
      photoUrl: data.user.photoURL,
      displayName: data.user.displayName,
      authType: "google",
    };
    setRefreshToken(data.user.refreshToken);
    setAccessToken(await data.user.getIdToken());
    setAuthType("google");
    const response = await axios.post(
      `http://localhost:5000/api/user/login?authType=${getAuthType()}`,
      { userData: userBody }
    );
    const userData: IUserBody = response.data.payload;
    return userData;
  } catch (error) {
    setRefreshToken("");
    setAccessToken("");
    setAuthType("");
    return null;
  }
};
