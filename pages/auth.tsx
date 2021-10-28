// auth.tsx
import {getAuth} from "firebase/auth";

import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import app from "../firebase/clientApp";


const auth = getAuth(app)
// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  
  signInOptions: [auth],
};

function SignInScreen() {
  return (
    <div>
      <h1>Pineapple Login</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignInScreen;
