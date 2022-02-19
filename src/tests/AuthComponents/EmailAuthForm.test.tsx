import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import EmailAuthForm from '../../components/AuthComponents/EmailAuthForm';

const mockSignInWithEmail = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signInWithEmail: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => mockSignInWithEmail({ email, password }),
}));

describe('tests EmailAuthForm component', () => {
  it('inputs have correct values after typing', () => {
    render(<EmailAuthForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    userEvent.type(emailInput, 'test{space}email');
    userEvent.type(passwordInput, 'test{space}password');

    expect(emailInput).toHaveValue('test email');
    expect(passwordInput).toHaveValue('test password');
  });

  it('invokes firebase.signInWithEmail with correct argument', () => {
    render(<EmailAuthForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

    userEvent.type(emailInput, '@.com');
    userEvent.type(passwordInput, 'secret');
    userEvent.click(submitButton);

    expect(mockSignInWithEmail).toHaveBeenCalledWith({
      email: '@.com',
      password: 'secret',
    });
  });
});
