import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';

const EmailAuthForm: FC = function EmailAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.target.value);
  const onPasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(event.target.value);

  const emailFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.signInWithEmail({ email, password });
  };

  return (
    <section>
      <h3>lets do this</h3>
      <form onSubmit={emailFormHandler}>
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
