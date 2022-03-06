import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringCompactView from '../../components/Strings/StringCompactView';

jest.mock(
  '../../components/Loading',
  () =>
    function LoadingMock() {
      return <h2>Loading component rendered</h2>;
    },
);

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
  Link: function MockLink() {
    return <h2>Link component rendered</h2>;
  },
}));

const mockGetString = jest.fn();

jest.mock('../../utils/firebase', () => ({
  getString: async (stringId: string) => {
    mockGetString(stringId);
    return {
      author: { username: 'authored', id: '3331' },
      associatedBox: { name: 'test', id: '123' },
    };
  },
}));

describe('tests StringCompactView', () => {
  it('renders Loading component upon first load, then unmounts it', async () => {
    render(<StringCompactView stringId="" />);
    await waitFor(() =>
      expect(
        screen.queryByText('Loading component rendered'),
      ).not.toBeInTheDocument(),
    );
  });

  it('invokes firebase.getString method with correct argument', async () => {
    render(<StringCompactView stringId="223e4" />);

    await waitFor(() => expect(mockGetString).toHaveBeenCalledWith('223e4'));
  });
});
