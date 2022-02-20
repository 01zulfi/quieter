import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';

const EmailSignUpForm: FC = function EmailSignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.target.value);
  const onPasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(event.target.value);

  const emailFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkExists = await firebase.checkIfEmailExists(email);
    if (checkExists) {
      setExists(checkExists);
      setSubmitted(true);
      setEmail('');
      setPassword('');
      return;
    }
    await firebase.signUpWithEmail({ email, password });
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
        {submitted && exists && <p>Email already exists</p>}
        <Button
          status="primary"
          textContent="Sign Up with Email"
          clickHandler={() => {}}
          type="submit"
        />
      </form>
    </section>
  );
};

export default EmailSignUpForm;
