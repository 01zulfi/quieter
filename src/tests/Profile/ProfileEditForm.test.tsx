import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProfileEditForm from '../../components/Profile/ProfileEditForm';

const mockEditUserDoc = jest.fn();

jest.mock('../../utils/firebase', () => ({
  editUserDoc: async (args: any) => mockEditUserDoc(args),
}));

jest.mock('../../context/ProfileContext', () => ({
  useProfile: () => ({
    username: 'test-user',
  }),
}));

describe('tests ProfileEditForm component', () => {
  it('input has correct value', () => {
    render(<ProfileEditForm />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('test-user');
  });

  it('renders profile updated text when form submits', async () => {
    render(<ProfileEditForm />);
    const button = screen.getByRole('button', {
      name: 'Update',
    });

    userEvent.click(button);

    expect(
      await screen.findByRole('heading', {
        name: 'Profile updated',
      }),
    ).toBeInTheDocument();
  });

  it('invokes firebase.editUserDoc with correct argument', async () => {
    render(<ProfileEditForm />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: 'Update',
    });

    userEvent.type(input, '{selectall}{clear}edit-user');
    userEvent.click(button);

    await waitFor(() =>
      expect(mockEditUserDoc).toHaveBeenCalledWith({
        username: 'edit-user',
      }),
    );
  });
});
