import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';

const EmailAuthForm: FC = function EmailAuthForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(event.target.value);
  const onEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.target.value);
  const onPasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(event.target.value);

  const emailFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.signInWithEmail({ username, email, password });
  };

  return (
    <section>
      <h3>lets do this</h3>
      <form onSubmit={emailFormHandler}>
        <label htmlFor="username-input">
          username
          <input
            type="text"
            id="username-input"
            value={username}
            onChange={onUsernameInput}
          />
        </label>
        <label htmlFor="email-input">
          email
          <input
            type="text"
            id="email-input"
            value={email}
            onChange={onEmailInput}
          />
        </label>
        <label htmlFor="password-input">
          password
          <input
            type="text"
            id="password-input"
            value={password}
            onChange={onPasswordInput}
          />
        </label>
        <Button textContent="sign in" clickHandler={() => {}} type="submit" />
      </form>
    </section>
  );
};

export default EmailAuthForm;
