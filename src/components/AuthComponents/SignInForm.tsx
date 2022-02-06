import React, { FC, useState } from 'react';
import Button from './Button';
import Modal from './Modal';

const SignInForm: FC = function SignInForm() {
  const [showEmailSignInModal, setShowEmailSignInModal] = useState(false);

  const emailSignInHandler = (): void => setShowEmailSignInModal(true);

  const onCloseEmailModal = (): void => setShowEmailSignInModal(false);

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
          textContent="Sign in with email"
          clickHandler={emailSignInHandler}
        />
        <Button
          type="button"
          textContent="Sign in with Guest (Limited view)"
          clickHandler={guestSignInHandler}
        />
      </div>

      {showEmailSignInModal && (
        <Modal closeModal={onCloseEmailModal}>
          <EmailSignUpForm />
        </Modal>
      )}
    </div>
  );
};

export default SignInForm;
