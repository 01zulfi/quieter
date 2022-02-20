import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';

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
    <section>
      <form onSubmit={emailFormHandler}>
        <label htmlFor="email-input">
          email
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={onEmailInput}
            required
          />
        </label>
        <label htmlFor="password-input">
          password
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={onPasswordInput}
            required
            minLength={6}
          />
        </label>
        {isError && <p>User already exists</p>}
        <Button
          status="primary"
          textContent="Sign In with Email"
          clickHandler={() => {}}
          type="submit"
        />
      </form>
    </section>
  );
};

export default EmailSignInForm;
