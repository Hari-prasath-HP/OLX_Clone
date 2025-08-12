
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKipadYLTDI4_kAvF2TqA6opSFU9fcR74",
  authDomain: "olx-clone-9cf11.firebaseapp.com",
  projectId: "olx-clone-9cf11",
  storageBucket: "olx-clone-9cf11.appspot.com",
  messagingSenderId: "755857726795",
  appId: "1:755857726795:web:26db8de98438c29cbedcce"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
