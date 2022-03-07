import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import SignInForm from '../../components/AuthComponents/SignInForm';

jest.mock(
  '../../components/AuthComponents/EmailSignInForm',
  () =>
    function EmailSignInFormMock() {
      return <h2>EmailSignInForm component rendered</h2>;
    },
);

jest.mock(
  '../../components/AuthComponents/EmailSignUpForm',
  () =>
    function EmailSignUpFormMock() {
      return <h2>EmailSignUpForm component rendered</h2>;
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

  it('renders EmailSignInForm component', () => {
    render(<SignInForm />);
    const renderText = screen.getByRole('heading', {
      name: 'EmailSignInForm component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('renders EmailSignUpForm component when sign up button clicks', () => {
    render(<SignInForm />);
    const signUp = screen.getByRole('button', {
      name: 'Sign Up',
    });

    userEvent.click(signUp);

    const renderText = screen.getByRole('heading', {
      name: 'EmailSignUpForm component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('renders EmailSignInForm component when sign in button clicks', () => {
    render(<SignInForm />);
    const signUp = screen.getByRole('button', {
      name: 'Sign Up',
    });

    userEvent.click(signUp);
    userEvent.click(
      screen.getByRole('button', {
        name: 'Sign in here',
      }),
    );

    const renderText = screen.getByRole('heading', {
      name: 'EmailSignInForm component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });
});
