// auth.tsx
import firebase from 'firebase/compat/app';
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
//
import React, {FC, useCallback, useEffect} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
//import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = firebase.initializeApp(clientCredentials);

const db = getFirestore(app)
const auth = getAuth(app)


//const auth = getAuth(app)
/*
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
*/
require('firebase/auth');

interface Props{
	firebaseClient: typeof firebase;
	config: firebaseui.auth.Config;
}

const LoginFinal: FC<Props> =({firebaseClient, config}) => {
	const loadFirebaseui = useCallback(async () => {
		const firebaseui = await import("firebaseui");
		const firebaseUi = 
			firebaseui.auth.AuthUI.getInstance() ||
			new firebaseui.auth.AuthUI(firebase.app().auth());
		var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
			},
			uiShown: function() {
			  // The widget is rendered.
			  // Hide the loader.
			  document.getElementById('loader').style.display = 'none';
			}
		  },
		  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		  signInFlow: 'popup',
		  signInSuccessUrl: '<url-to-redirect-to-on-success>',
		  signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		   
		  ],
		  // Terms of service url.
		  tosUrl: '<your-tos-url>',
		  // Privacy policy url.
		  privacyPolicyUrl: '<your-privacy-policy-url>'
		};
		firebaseUi.start('#firebaseui-auth-container',uiConfig);
	}, [firebaseClient, config]);
	
	useEffect(() => {
		loadFirebaseui();
		
	}, []);
	return (
    <div>
      <h1>Pineapple Login</h1>
      <p>Please sign-in:</p>
      <div id="firebaseui-auth-container"></div>
	  <div id="loader">Loading...</div>
    </div>
  );
};
/*


ui.start('#firebaseui-auth-container',{
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
});
*/
function SignInScreen() {
  return (
    <div>
      <h1>Pineapple Login</h1>
      <p>Please sign-in:</p>
      <div id="firebaseui-auth-container"></div>
	  <div id="loader">Loading...</div>
    </div>
  );
}

export default LoginFinal;
