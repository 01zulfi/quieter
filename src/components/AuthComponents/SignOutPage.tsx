import React, { FC, useState, useEffect } from 'react';
import Loading from '../Loading';
import firebase from '../../utils/firebase';

const SignOutPage: FC = function SignOutPage() {
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    firebase.signOutUser();
    setIsSignedOut(true);
  }, []);

  return (
    <section>
      {isSignedOut ? <h2>successfully signed out</h2> : <Loading />}
    </section>
  );
};

export default SignOutPage;
