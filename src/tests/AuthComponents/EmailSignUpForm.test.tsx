import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import EmailSignUpForm from '../../components/AuthComponents/EmailSignUpForm';

const mockSignUpWithEmail = jest.fn();
const mockCheckIfEmailExists = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signUpWithEmail: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => mockSignUpWithEmail({ email, password }),
  checkIfEmailExists: async (email: string) => mockCheckIfEmailExists(email),
}));

describe('tests EmailSignUpForm component', () => {
  it('inputs have correct values after typing', () => {
    mockCheckIfEmailExists.mockImplementation(() => false);
    render(<EmailSignUpForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'test password');

    expect(emailInput).toHaveValue('example@wow.com');
    expect(passwordInput).toHaveValue('test password');
  });

  it('invokes firebase.checkIfEmailExists with correct argument', () => {
    mockCheckIfEmailExists.mockImplementation(() => false);
    render(<EmailSignUpForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'secret');
    userEvent.click(submitButton);

    expect(mockCheckIfEmailExists).toHaveBeenCalledWith('example@wow.com');
  });

  it('invokes firebase.signUpWithEmail with correct argument', async () => {
    mockCheckIfEmailExists.mockImplementation(() => false);
    render(<EmailSignUpForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'secret');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(mockSignUpWithEmail).toHaveBeenCalledWith({
        email: 'example@wow.com',
        password: 'secret',
      }),
    );
  });

  it('does no invoke signUpWithEmail if checkIfEmailExists returns true', async () => {
    mockCheckIfEmailExists.mockImplementation(() => true);
    render(<EmailSignUpForm />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

    userEvent.type(emailInput, 'example@wow.com');
    userEvent.type(passwordInput, 'secret');
    userEvent.click(submitButton);

    await waitFor(() => expect(mockSignUpWithEmail).not.toHaveBeenCalled());
  });
});
