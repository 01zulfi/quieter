import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../utils/test-utils';
import Explore from '../components/Explore/Explore';

const mockGetBoxList = jest.fn();
jest.mock('../utils/firebase', () => ({
  getBoxList: async () => {
    mockGetBoxList();
    return [
      { name: 'test', id: 'er432' },
      { name: 'test2', id: '432' },
    ];
  },
}));

jest.mock(
  '../components/Loading',
  () =>
    function LoadingMock() {
      return <h2>Loading component rendered</h2>;
    },
);

jest.mock(
  '../components/Explore/ExploreItem',
  () =>
    function ExploreItemMock({ boxName }: { boxName: string }) {
      return <h4>{boxName}</h4>;
    },
);

jest.mock(
  '../components/Boxes/BoxCreateModal',
  () =>
    function BoxCreateModalMock({ closeModal }: { closeModal: any }) {
      return (
        <>
          <h2>BoxCreateModal component rendered</h2>
          <button type="button" onClick={closeModal}>
            close modal mock
          </button>
        </>
      );
    },
);

const mockUseUserAnon = jest.fn(() => false);
jest.mock('../context/UserContext', () => ({
  useUserAnon: () => mockUseUserAnon(),
}));

describe('tests Explore component', () => {
  it('does not render create box button when user is anonymous/guest', async () => {
    mockUseUserAnon.mockImplementation(() => true);
    render(<Explore />);

    await waitFor(() => {
      const createBoxButton = screen.queryByRole('button', {
        name: 'Create box',
      });
      expect(createBoxButton).not.toBeInTheDocument();
    });
  });

  it('renders create box button when user is not anonymous/guest', async () => {
    render(<Explore />);
    const createBoxButton = await screen.findByRole('button', {
      name: 'Create box',
    });
    expect(createBoxButton).toBeInTheDocument();
  });

  it('renders BoxCreateModal component when create box button clicks', async () => {
    render(<Explore />);
    const createBoxButton = await screen.findByRole('button', {
      name: 'Create box',
    });

    userEvent.click(createBoxButton);

    expect(
      screen.getByRole('heading', {
        name: 'BoxCreateModal component rendered',
      }),
    ).toBeInTheDocument();
  });

  it('dismounts BoxCreateModal component when close modal button clicks', async () => {
    render(<Explore />);
    const createBoxButton = await screen.findByRole('button', {
      name: 'Create box',
    });

    userEvent.click(createBoxButton);

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    expect(
      screen.queryByRole('heading', {
        name: 'BoxCreateModal component rendered',
      }),
    ).not.toBeInTheDocument();
  });

  it('renders Loading component, then dismounts it', async () => {
    render(<Explore />);
    await waitFor(() =>
      expect(
        screen.queryByRole('heading', { name: 'Loading component rendered' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('renders box data correctly', async () => {
    render(<Explore />);
    const boxOne = await screen.findByText('test');
    const boxTwo = await screen.findByText('test2');

    expect(boxOne).toBeInTheDocument();
    expect(boxTwo).toBeInTheDocument();
  });
});
