import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import firebase from '../../utils/firebase';
import Button from '../Button';
import EmailSignInForm from './EmailSignInForm';
import EmailSignUpForm from './EmailSignUpForm';

const SignInFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3em;
  padding: 0.1em;
  width: 100%;
  margin: 1em;
  height: fit-content;
  gap: 1em;

  @media (min-width: 680px) {
    margin-top: 2.5em;
  }
`;

const OrWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.2em;
  justify-content: stretch;
`;

const Line = styled.div`
  background: ${(props: any) => props.theme.aurora.four};
  flex-grow: 1;
  padding: 0.1em;
`;

const OrText = styled.p``;

const EmailFormWrapper = styled.div`
  background: ${(props: any) => props.theme.base.two};
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  gap: 1em;
  width: 100%;

  @media (min-width: 680px) {
    width: 75%;
  }
`;

const EmailButtonsWrapper = styled.div`
  background: ${(props: any) => props.theme.base.three};
  color: ${(props: any) => props.theme.text.two};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0.4em;
  border-radius: 10px;
  width: 100%;

  @media (min-width: 680px) {
    width: 75%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1em;
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

      <EmailFormWrapper>
        {showEmailSignInForm ? <EmailSignInForm /> : <EmailSignUpForm />}
        {showEmailSignInForm ? (
          <EmailButtonsWrapper>
            <p>Don&apos;t have an account? </p>
            <Button
              textContent="Sign Up"
              clickHandler={onSignUpClick}
              status="secondary"
              type="button"
              padding="0.5em"
            />
          </EmailButtonsWrapper>
        ) : (
          <EmailButtonsWrapper>
            <p>Already have an account?</p>
            <Button
              textContent="Sign in here"
              clickHandler={onSignInClick}
              status="secondary"
              type="button"
              padding="0.5em"
            />
          </EmailButtonsWrapper>
        )}
      </EmailFormWrapper>

      <OrWrapper>
        <Line />
        <OrText>or</OrText>
        <Line />
      </OrWrapper>

      <ButtonWrapper>
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
      </ButtonWrapper>
    </SignInFormWrapper>
  );
};

export default SignInForm;
