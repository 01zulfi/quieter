import React, { FC } from 'react';
import SignInForm from './SignInForm';

const SignInPage: FC = function SignInPage() {
  return (
    <section>
      <h1>Sign in to quieter</h1>
      <SignInForm />
    </section>
  );
};

export default SignInPage;
