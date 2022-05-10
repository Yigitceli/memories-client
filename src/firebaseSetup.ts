// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC7IpBiVL70zuECT0HQeRbh6PqjkplpNs",
  authDomain: "memories-cbddb.firebaseapp.com",
  projectId: "memories-cbddb",
  storageBucket: "memories-cbddb.appspot.com",
  messagingSenderId: "540752354235",
  appId: "1:540752354235:web:d0331c62371742436f429e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const memoriesRef = (imageName: string) => {
  return ref(storage, `memories/${imageName}`);
};
export const usersRef = (userId:string) => {
  return ref(storage, `users/${userId}`)
}
