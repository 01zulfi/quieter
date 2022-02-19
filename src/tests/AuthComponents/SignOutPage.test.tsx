import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import SignOutPage from '../../components/AuthComponents/SignOutPage';

jest.mock(
  '../../components/Loading',
  () =>
    function LoadingMock() {
      return <h2>Loading component rendered</h2>;
    },
);

const mockSignOutUser = jest.fn();

jest.mock('../../utils/firebase', () => ({
  signOutUser: () => mockSignOutUser(),
}));

describe('tests SignOutPage component', () => {
  it('renders Loading component on initial render, then unmounts it', async () => {
    render(<SignOutPage />);

    await waitFor(() =>
      expect(
        screen.queryByText('Loading component rendered'),
      ).not.toBeInTheDocument(),
    );
  });

  it('renders successfully sign out heading', async () => {
    render(<SignOutPage />);

    const heading = await screen.findByRole('heading', {
      name: 'successfully signed out',
    });

    expect(heading).toBeInTheDocument();
  });

  it('invokes firebase.signOutUser method', () => {
    render(<SignOutPage />);

    expect(mockSignOutUser).toHaveBeenCalledTimes(1);
  });
});
