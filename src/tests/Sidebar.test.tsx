import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../utils/test-utils';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar';

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

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return <a href={to}>{children}</a>;
  },
  useNavigate: () => () => {},
}));

const mockUseUserAnon = jest.fn(() => false);
const mockGetBoxList = jest.fn();

jest.mock('../context/UserContext', () => ({
  useUserAnon: () => mockUseUserAnon(),
}));

jest.mock('../utils/firebase.ts', () => ({
  getBoxList: async () => {
    mockGetBoxList();
    return [
      { name: 'test', id: '231232' },
      { name: 'test2', id: 'afd' },
    ];
  },
}));

describe('tests Sidebar component', () => {
  describe('when user is not anonymous/guest', () => {
    it('renders BoxCreateModal component when create box button clicks', async () => {
      render(<Sidebar />);
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
      render(<Sidebar />);
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
  });

  describe('when user is anonymous/guest', () => {
    it('does not render create box button', async () => {
      mockUseUserAnon.mockImplementation(() => true);
      render(<Sidebar />);

      await waitFor(() => {
        const createBoxButton = screen.queryByRole('button', {
          name: 'Create box',
        });

        expect(createBoxButton).not.toBeInTheDocument();
      });
    });
  });

  it('invokes firebase.getBoxList', async () => {
    render(<Sidebar />);
    await waitFor(() => expect(mockGetBoxList).toHaveBeenCalledTimes(1));
  });

  it('renders box links as per data', async () => {
    render(<Sidebar />);
    const boxOne = await screen.findByText('test');
    const boxTwo = await screen.findByText('test2');

    expect(boxOne).toBeInTheDocument();
    expect(boxTwo).toBeInTheDocument();
  });
});
