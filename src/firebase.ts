import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  getAuthType,
  setAccessToken,
  setAuthType,
  setRefreshToken,
} from "./utils";
import { IUserBody } from "./types";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCC7IpBiVL70zuECT0HQeRbh6PqjkplpNs",
  authDomain: "memories-cbddb.firebaseapp.com",
  projectId: "memories-cbddb",
  storageBucket: "memories-cbddb.appspot.com",
  messagingSenderId: "540752354235",
  appId: "1:540752354235:web:d0331c62371742436f429e",
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);


