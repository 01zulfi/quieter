import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import Button from '../Button';
import EmailAuthForm from './EmailAuthForm';
import Modal from '../Modal';

const SignInForm: FC = function SignInForm() {
  const [showEmailSignInModal, setShowEmailSignInModal] = useState(false);

  const emailSignInHandler = (): void => setShowEmailSignInModal(true);
  const onCloseEmailModal = (): void => setShowEmailSignInModal(false);

  const googleSignInHandler = async () => {
    await firebase.signInWithGoogle();
  };
  const guestSignInHandler = async () => {
    await firebase.signInAsGuest();
  };

  return (
    <div>
      <h1>Sign in to continue</h1>

      <div>
        <Button
          type="button"
          textContent="Sign in with Google"
          clickHandler={googleSignInHandler}
        />
        <Button
          type="button"
          textContent="Sign in with Email"
          clickHandler={emailSignInHandler}
        />
        <Button
          type="button"
          textContent="Sign in as Guest (Limited view)"
          clickHandler={guestSignInHandler}
        />
      </div>

      {showEmailSignInModal && (
        <Modal closeModal={onCloseEmailModal}>
          <EmailAuthForm />
        </Modal>
      )}
    </div>
  );
};

export default SignInForm;
