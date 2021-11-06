import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 'loan-comparison-tool',//process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = firebase.initializeApp(clientCredentials);

const db = getFirestore(app)
//const auth = getAuth(app)

export default app;
