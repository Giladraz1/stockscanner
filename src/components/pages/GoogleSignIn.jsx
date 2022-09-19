import React from "react";

import { FirebaseAuthConsumer } from "@react-firebase/auth";

function GooglePageLogin() {
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <h1>Login</h1>
      <FirebaseAuthConsumer>
        {({ firebase }) => (
          <button
            // variant="contained"
            // color="primary"
            onClick={() => handleGoogleSignIn(firebase)}
          >
            Sign in with Google
          </button>
        )}
      </FirebaseAuthConsumer>
    </>
  );
}

export default GooglePageLogin;
