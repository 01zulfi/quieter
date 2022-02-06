import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignInForm from '../../components/AuthComponents/SignInForm';

jest.mock(
  '../../components/AuthComponents/EmailAuthForm',
  () =>
    function EmailAuthFormMock() {
      return <h2>EmailAuthForm component rendered</h2>;
    },
);

jest.mock(
  '../../components/Modal',
  () =>
    function ModalMock({
      closeModal,
      children,
    }: {
      closeModal: any;
      children: any;
    }) {
      return (
        <>
          {children}
          <button type="button" onClick={closeModal}>
            close modal mock
          </button>
        </>
      );
    },
);

const mockSignInAsGuest = jest.fn();
const mockSignInWithGoogle = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signInAsGuest: async () => mockSignInAsGuest(),
  signInWithGoogle: async () => mockSignInWithGoogle(),
}));

describe('tests SignInForm component', () => {
  it('invokes firebase.signInWithGoogle when google sign in button is clicked', () => {
    render(<SignInForm />);
    const googleButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });

    userEvent.click(googleButton);

    expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1);
  });

  it('invokes firebase.signInAsGuest when guest sign in button is clicked', () => {
    render(<SignInForm />);
    const guestButton = screen.getByRole('button', {
      name: 'Sign in as Guest (Limited view)',
    });

    userEvent.click(guestButton);

    expect(mockSignInAsGuest).toHaveBeenCalledTimes(1);
  });

  it('renders EmailAuthForm component when email sign in button is clicked', () => {
    render(<SignInForm />);
    const emailButton = screen.getByRole('button', {
      name: 'Sign in with Email',
    });

    userEvent.click(emailButton);

    const renderText = screen.getByRole('heading', {
      name: 'EmailAuthForm component rendered',
    });
    expect(renderText).toBeInTheDocument();
  });

  it('unmounts EmailAuthForm component when close modal button is clicked', () => {
    render(<SignInForm />);
    const emailButton = screen.getByRole('button', {
      name: 'Sign in with Email',
    });

    userEvent.click(emailButton);

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });
    userEvent.click(closeModalButton);

    const renderText = screen.queryByRole('heading', {
      name: 'EmailAuthForm component rendered',
    });
    expect(renderText).not.toBeInTheDocument();
  });
});
