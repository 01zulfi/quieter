import React from 'react';
import '@testing-library/jest-dom';
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

describe('tests Explore component', () => {
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
