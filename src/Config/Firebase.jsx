import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCHxm-WgBiUdPeAk9i7YqlHBgjwqivF4Xc",
  authDomain: "coin-trekker.firebaseapp.com",
  databaseURL: "https://coin-trekker-default-rtdb.firebaseio.com",
  projectId: "coin-trekker",
  storageBucket: "coin-trekker.appspot.com",
  messagingSenderId: "302630857770",
  appId: "1:302630857770:web:8373a2cbf382025bd22753"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider(app);
