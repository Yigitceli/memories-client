import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { ILoginBody, IUserBody } from "./types";

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

export const removeAccessToken = (): void => {
  window.localStorage.removeItem("accessToken");
};
export const removeRefreshToken = (): void => {
  window.localStorage.removeItem("refreshToken");
};
export const removeAuthType = (): void => {
  window.localStorage.removeItem("authType");
};

export const googleSignIn = async (): Promise<IUserBody> => {
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
    `https://yigit-memories-backend.herokuapp.com/api/user/login?authType=google`,
    { userData: userBody }
  );
  console.log(response);
  const userData: IUserBody = response.data.payload;

  return userData;
};

export const customSignIn = async (
  data: ILoginBody | undefined
): Promise<IUserBody> => {
  const response = await axios.post(
    "https://yigit-memories-backend.herokuapp.com/api/user/login?authType=custom",
    { userData: data }
  );
  const { accessToken, refreshToken, UserData } = response.data.payload;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setAuthType("custom");
  return UserData as IUserBody;
};

export function firstLetterUpperCase(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
}
