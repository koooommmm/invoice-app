import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWXHi-qfDde2CuAhk3cv2kvAYgmuyAAjA",
  authDomain: "invoice-app-3f2c3.firebaseapp.com",
  projectId: "invoice-app-3f2c3",
  storageBucket: "invoice-app-3f2c3.appspot.com",
  messagingSenderId: "289616041770",
  appId: "1:289616041770:web:1f17a688e317ca5e4c3053",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
