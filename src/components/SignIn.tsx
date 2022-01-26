import React, { FC } from 'react';
import Button from './Button';

const SignIn: FC = function SignIn() {
  return (
    <div>
      <h1>Sign in to continue</h1>
      <Button
        type="button"
        textContent="Sign in with Google"
        clickHandler={() => {}}
      />
      <Button
        type="button"
        textContent="Sign in with Guest (Limited view)"
        clickHandler={() => {}}
      />
    </div>
  );
};

export default SignIn;
