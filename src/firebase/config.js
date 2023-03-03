import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";





export const firebaseConfig = {
    apiKey: "AIzaSyAf1IVuEmsM8Qjm4xdPKiTgrLgt9bR5QR4",
    authDomain: "eshop-test2023.firebaseapp.com",
    projectId: "eshop-test2023",
    storageBucket: "eshop-test2023.appspot.com",
    messagingSenderId: "93038613781",
    appId: "1:93038613781:web:6181579d2ff7ec3557c51c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;