import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import ProfileEditableView from '../../components/Profile/ProfileEditableView';

jest.mock(
  '../../components/Profile/ProfileEditModal',
  () =>
    function ProfileEditModalMock({ onCloseModal }: { onCloseModal: any }) {
      return (
        <>
          <h1>ProfileEditModal component rendered</h1>
          <button type="button" onClick={onCloseModal}>
            close modal mock
          </button>
        </>
      );
    },
);

describe('tests ProfileEditableView component', () => {
  it('renders ProfileEditModal when edit profile button clicks', () => {
    render(<ProfileEditableView />);
    const button = screen.getByRole('button', {
      name: 'Edit profile',
    });

    userEvent.click(button);

    expect(
      screen.getByRole('heading', {
        name: 'ProfileEditModal component rendered',
      }),
    ).toBeInTheDocument();
  });

  it('unmounts ProfileEditModal when close modal button clicks', () => {
    render(<ProfileEditableView />);
    const button = screen.getByRole('button', {
      name: 'Edit profile',
    });

    userEvent.click(button);

    const closeButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeButton);

    expect(
      screen.queryByText('ProfileEditModal component rendered'),
    ).not.toBeInTheDocument();
  });
});
