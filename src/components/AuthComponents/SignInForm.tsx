import React, { FC, useState } from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';
import Button from '../Button';
import EmailSignInForm from './EmailSignInForm';
import EmailSignUpForm from './EmailSignUpForm';

const SignInFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignInForm: FC = function SignInForm() {
  const [showEmailSignInForm, setShowEmailSignInForm] = useState(true);

  const onSignUpClick = (): void => setShowEmailSignInForm(false);
  const onSignInClick = (): void => setShowEmailSignInForm(true);

  const googleSignInHandler = async () => {
    await firebase.signInWithGoogle();
  };
  const guestSignInHandler = async () => {
    await firebase.signInAsGuest();
  };

  return (
    <SignInFormWrapper>
      <h2>Sign in to continue</h2>

      {showEmailSignInForm ? <EmailSignInForm /> : <EmailSignUpForm />}

      {showEmailSignInForm ? (
        <div>
          <p>Don&apos;t have an account? </p>
          <Button
            textContent="Sign Up"
            clickHandler={onSignUpClick}
            status="secondary"
            type="button"
          />
        </div>
      ) : (
        <div>
          <p>ALready have an account?</p>
          <Button
            textContent="Sign in here"
            clickHandler={onSignInClick}
            status="secondary"
            type="button"
          />
        </div>
      )}

      <div>
        <Button
          type="button"
          textContent="Sign in with Google"
          clickHandler={googleSignInHandler}
          status="primary"
        />
        <Button
          type="button"
          textContent="Sign in as Guest (Limited view)"
          clickHandler={guestSignInHandler}
          status="secondary"
        />
      </div>
    </SignInFormWrapper>
  );
};

export default SignInForm;
