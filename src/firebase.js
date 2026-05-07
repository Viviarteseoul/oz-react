import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1N0_UibqSxuL9xN02we5D12CC4UlElno",
  authDomain: "viviarte-seoul.firebaseapp.com",
  projectId: "viviarte-seoul",
  storageBucket: "viviarte-seoul.firebasestorage.app",
  messagingSenderId: "767934064913",
  appId: "1:767934064913:web:9b852376e3c3c0f49704b0",
  measurementId: "G-PG38QQJ8JZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
