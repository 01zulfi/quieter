import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxContainer from '../../components/Boxes/BoxContainer';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ boxId: '001122' }),
}));

jest.mock('../../context/UserContext', () => ({
  useUser: () => ({
    joinedBoxes: ['001122'],
    adminBoxes: ['001122'],
  }),
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
    function BoxRegularView() {
      return <h2>BoxRegularView component rendered</h2>;
    },
);

jest.mock(
  '../../components/Strings/StringCreateModal',
  () =>
    function StringCreateModal() {
      return <h2>StringCreateModal component rendered</h2>;
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
}));

describe('tests BoxContainer component', () => {
  it('renders loading, then disappears', async () => {
    render(<BoxContainer />);

    await waitFor(() =>
      expect(
        screen.queryByRole('heading', { name: 'Loading component rendered' }),
      ).not.toBeInTheDocument(),
    );
  });
});
