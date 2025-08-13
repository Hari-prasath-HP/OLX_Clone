// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyDKipadYLTDI4_kAvF2TqA6opSFU9fcR74",
  authDomain: "olx-clone-9cf11.firebaseapp.com",
  projectId: "olx-clone-9cf11",
  storageBucket: "olx-clone-9cf11.firebasestorage.app",
  messagingSenderId: "755857726795",
  appId: "1:755857726795:web:26db8de98438c29cbedcce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);
const db = getFirestore(app);

// Example Firestore fetch function
const fetchFromFirestore = async () => {
  try {
    const productsCollection = collection(fireStore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};

export { auth,db, provider, storage, fireStore, fetchFromFirestore,firebaseConfig };
