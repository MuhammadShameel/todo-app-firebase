import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaIvX6SbbJrsHWUthbknMBTiMB5aOxxoo",
  authDomain: "todoapp-81bfc.firebaseapp.com",
  projectId: "todoapp-81bfc",
  storageBucket: "todoapp-81bfc.appspot.com",
  messagingSenderId: "485005177740",
  appId: "1:485005177740:web:3c8fce3cd64b3d99bb9ca9",
  measurementId: "G-TELK6SXQWL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const dataBase = firebaseApp.firestore();
const auth = getAuth();

export { dataBase };
