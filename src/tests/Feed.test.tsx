import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feed from '../components/Feed';

const mockGetFeedStrings = jest.fn();

jest.mock('../utils/firebase', () => ({
  getFeedStrings: async () => mockGetFeedStrings(),
}));

jest.mock(
  '../components/Strings/StringCompactView',
  () =>
    function StringCompactViewMock({ stringId }: { stringId: string }) {
      return <h2>{stringId}</h2>;
    },
);

jest.mock(
  '../components/Loading',
  () =>
    function LoadingMock() {
      return <h2>Loading component rendered</h2>;
    },
);

describe('tests Feed component', () => {
  it('renders Loading component upon first page load, and then disappears', async () => {
    render(<Feed />);
    await waitFor(() =>
      expect(
        screen.queryByText('Loading component rendered'),
      ).not.toBeInTheDocument(),
    );
  });

  it('renders no feed available message when feedStrings is null/undefined', async () => {
    mockGetFeedStrings.mockImplementation(() => null);
    render(<Feed />);

    const heading = await screen.findByRole('heading', {
      name: 'No feed available. Populate it by getting involved!',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders no feed available message when feedStrings is an empty array', async () => {
    mockGetFeedStrings.mockImplementation(() => []);
    render(<Feed />);

    const heading = await screen.findByRole('heading', {
      name: 'No feed available. Populate it by getting involved!',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders StringCompactView component according to feedStrings data', async () => {
    mockGetFeedStrings.mockImplementation(() => ['id1', 'str']);
    render(<Feed />);

    const stringOne = await screen.findByRole('heading', {
      name: 'id1',
    });
    const stringTwo = await screen.findByRole('heading', {
      name: 'str',
    });

    expect(stringOne).toBeInTheDocument();
    expect(stringTwo).toBeInTheDocument();
  });
});
