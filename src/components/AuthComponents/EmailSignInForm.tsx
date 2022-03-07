import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';
import EmailFormWrapper from './EmailFormWrapper';

const EmailSignInForm: FC = function EmailSignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const onEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.target.value);
  const onPasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(event.target.value);

  const emailFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await firebase.signInWithEmail({
      setIsError,
      email,
      password,
    });
    setEmail('');
    setPassword('');
  };

  return (
    <EmailFormWrapper>
      <form onSubmit={emailFormHandler}>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={onEmailInput}
            required
            placeholder="enter email here..."
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            id="password-input"
            placeholder="enter password here..."
            value={password}
            onChange={onPasswordInput}
            required
            minLength={6}
          />
        </label>
        {isError && <p>Invalid email/password or user already exists.</p>}
        <Button
          status="primary"
          textContent="Sign In with Email"
          clickHandler={() => {}}
          type="submit"
        />
      </form>
    </EmailFormWrapper>
  );
};

export default EmailSignInForm;
