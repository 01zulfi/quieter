import React, { FC, useEffect, useState } from 'react';
import firebase from '../../utils/firebase';
import SignInForm from './SignInForm';

const SignInPage: FC = function SignInPage() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const setStateAfterSignIn =
      firebase.updateStateUponSignIn(setIsUserSignedIn);
    setStateAfterSignIn(true);
  }, []);

  return (
    <section>
      <h1>Sign in to quieter</h1>
      {isUserSignedIn ? (
        <div>
          <h2>Already signed in</h2>
          <p>Go to homepage</p>
        </div>
      ) : (
        <SignInForm />
      )}
    </section>
  );
};

export default SignInPage;
