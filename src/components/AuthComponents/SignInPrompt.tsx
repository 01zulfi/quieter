import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const SignInPrompt: FC = function SignInPrompt() {
  return (
    <div>
      not signed in
      <Link to="sign-in">sign in here</Link>
    </div>
  );
};

export default SignInPrompt;
