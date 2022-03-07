import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import EmailSignInForm from '../../components/AuthComponents/EmailSignInForm';

const mockSignInWithEmail = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signInWithEmail: async ({
    email,
    password,
    setIsError,
  }: {
    email: string;
    password: string;
    setIsError: any;
  }) => mockSignInWithEmail({ email, password, setIsError }),
}));

describe('tests EmailSignInForm component', () => {
  it('inputs have correct values after typing', () => {
    render(<EmailSignInForm />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'test password');

    expect(emailInput).toHaveValue('example@wow.com');
    expect(passwordInput).toHaveValue('test password');
  });

  it('invokes firebase.signInWithEmail when form submits', async () => {
    render(<EmailSignInForm />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', {
      name: 'Sign In with Email',
    });

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'test password');
    userEvent.click(submitButton);

    await waitFor(() => expect(mockSignInWithEmail).toHaveBeenCalledTimes(1));
  });
});
