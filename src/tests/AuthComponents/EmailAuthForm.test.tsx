import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EmailAuthForm from '../../components/AuthComponents/EmailAuthForm';

const mockSignInWithEmail = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signInWithEmail: async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => mockSignInWithEmail({ username, email, password }),
}));

describe('tests EmailAuthForm component', () => {
  it('inputs have correct values after typing', () => {
    render(<EmailAuthForm />);
    const usernameInput = screen.getByLabelText('username');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    userEvent.type(usernameInput, 'test{space}username');
    userEvent.type(emailInput, 'test{space}email');
    userEvent.type(passwordInput, 'test{space}password');

    expect(usernameInput).toHaveValue('test username');
    expect(emailInput).toHaveValue('test email');
    expect(passwordInput).toHaveValue('test password');
  });

  it('invokes firebase.signInWithEmail with correct argument', () => {
    render(<EmailAuthForm />);
    const usernameInput = screen.getByLabelText('username');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

    userEvent.type(usernameInput, 'wizard');
    userEvent.type(emailInput, '@.com');
    userEvent.type(passwordInput, 'secret');
    userEvent.click(submitButton);

    expect(mockSignInWithEmail).toHaveBeenCalledWith({
      username: 'wizard',
      email: '@.com',
      password: 'secret',
    });
  });
});
