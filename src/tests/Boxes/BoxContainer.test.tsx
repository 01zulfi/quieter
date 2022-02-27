import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import BoxContainer from '../../components/Boxes/BoxContainer';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ boxId: '001122' }),
}));

const mockUseUserAnon = jest.fn();

jest.mock('../../context/UserContext', () => ({
  useUser: () => ({
    joinedBoxes: ['001122'],
    adminBoxes: ['001122'],
  }),
  useSetUser: () => () => {},
  useUserAnon: () => mockUseUserAnon(),
}));

jest.mock(
  '../../components/Boxes/BoxAdminView',
  () =>
    function BoxAdminView() {
      return <h2>BoxAdminView component rendered</h2>;
    },
);

jest.mock(
  '../../components/Boxes/BoxRegularView',
  () =>
    function BoxRegularView({ onButtonClick }: { onButtonClick: any }) {
      return (
        <>
          <h2>BoxRegularView component rendered</h2>
          <button type="button" onClick={onButtonClick}>
            mock button in BoxRegularView
          </button>
        </>
      );
    },
);

jest.mock(
  '../../components/Strings/StringCreateModal',
  () =>
    function StringCreateModal({ closeModal }: { closeModal: any }) {
      return (
        <>
          <h2>StringCreateModal component rendered</h2>
          <button onClick={closeModal} type="button">
            mock button in StringCreateModal
          </button>
        </>
      );
    },
);

jest.mock(
  '../../components/Strings/StringCompactView',
  () =>
    function StringCompactView({ stringId }: { stringId: string }) {
      return <h2>{stringId}</h2>;
    },
);

jest.mock(
  '../../components/Loading',
  () =>
    function Loading() {
      return <h2>Loading component rendered</h2>;
    },
);

const mockGetBox = jest.fn();

jest.mock('../../utils/firebase', () => ({
  getBox: (boxId: string) => {
    mockGetBox(boxId);
    return {
      hasStrings: true,
      associatedStrings: ['first string', 'second string'],
    };
  },
  listenForBoxChanges: () => () => () => () => {},
}));

describe('tests BoxContainer component', () => {
  describe('when user is not anonymous/guest', () => {
    beforeEach(() => mockUseUserAnon.mockImplementation(() => false));

    it('renders loading, then disappears', async () => {
      render(<BoxContainer />);

      await waitFor(() =>
        expect(
          screen.queryByRole('heading', { name: 'Loading component rendered' }),
        ).not.toBeInTheDocument(),
      );
    });

    it('invokes firebase.getBox with correct argument', async () => {
      render(<BoxContainer />);

      await waitFor(() => expect(mockGetBox).toHaveBeenCalledWith('001122'));
    });

    it('renders BoxAdminView component when user is admin', async () => {
      render(<BoxContainer />);

      const renderText = await screen.findByRole('heading', {
        name: 'BoxAdminView component rendered',
      });

      expect(renderText).toBeInTheDocument();
    });

    it('renders BoxRegularView component', async () => {
      render(<BoxContainer />);

      const renderText = await screen.findByRole('heading', {
        name: 'BoxRegularView component rendered',
      });

      expect(renderText).toBeInTheDocument();
    });

    it('clicking button in BoxRegularView renders StringCreateModal', async () => {
      render(<BoxContainer />);

      const button = await screen.findByRole('button', {
        name: 'mock button in BoxRegularView',
      });

      userEvent.click(button);

      const renderText = screen.getByRole('heading', {
        name: 'StringCreateModal component rendered',
      });

      expect(renderText).toBeInTheDocument();
    });

    it('unmounts StringCreateModal when button with closeModal handler is clicked', async () => {
      render(<BoxContainer />);

      const buttonInRegular = await screen.findByRole('button', {
        name: 'mock button in BoxRegularView',
      });
      userEvent.click(buttonInRegular);
      const buttonInModal = screen.getByRole('button', {
        name: 'mock button in StringCreateModal',
      });
      userEvent.click(buttonInModal);
      const renderText = screen.queryByText(
        'StringCreateModal component rendered',
      );

      expect(renderText).not.toBeInTheDocument();
    });

    it('renders StringCompactView correctly', async () => {
      render(<BoxContainer />);

      const stringOne = await screen.findByRole('heading', {
        name: 'first string',
      });
      const stringTwo = await screen.findByRole('heading', {
        name: 'second string',
      });

      expect(stringOne).toBeInTheDocument();
      expect(stringTwo).toBeInTheDocument();
    });
  });

  describe('when user is anonymous/guest', () => {
    beforeEach(() => mockUseUserAnon.mockImplementation(() => true));

    it('does not render BoxAdminView component', async () => {
      render(<BoxContainer />);

      await waitFor(() =>
        expect(
          screen.queryByRole('heading', {
            name: 'BoxAdminView component rendered',
          }),
        ).not.toBeInTheDocument(),
      );
    });

    it('does not render StringCreateModal even if create string button in BoxRegularView is clicked', async () => {
      render(<BoxContainer />);
      expect(mockUseUserAnon).toHaveReturnedWith(true);
      const button = await screen.findByRole('button', {
        name: 'mock button in BoxRegularView',
      });

      userEvent.click(button);

      await waitFor(() =>
        expect(
          screen.queryByRole('heading', {
            name: 'StringCreateModal component rendered',
          }),
        ).not.toBeInTheDocument(),
      );
    });
  });
});
