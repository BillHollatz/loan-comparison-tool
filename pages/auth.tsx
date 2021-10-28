// auth.tsx
import {getAuth} from "firebase/auth";

import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import app from "../firebase/clientApp";


const auth = getAuth(app)
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());
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

export default SignInScreen;
