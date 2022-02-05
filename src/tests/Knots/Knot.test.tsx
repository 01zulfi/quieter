import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Knot from '../../components/Knots/Knot';

const mockGetKnot = jest.fn();

jest.mock('../../context/UserContext', () => ({
  useUser: () => ({
    id: '23',
    authoredKnots: ['789'],
  }),
}));

jest.mock('../../utils/firebase', () => ({
  getKnot: async (knotId: string) => {
    mockGetKnot(knotId);
    return { content: 'test content' };
  },
}));

describe('tests Knot component', () => {
  it('renders knot content', async () => {
    render(<Knot knotId="443" />);
    const contentText = await screen.findByText('test content');

    expect(contentText).toBeInTheDocument();
  });

  it('invokes firebase.getKnot method with correct argument', async () => {
    render(<Knot knotId="23" />);

    await waitFor(() => expect(mockGetKnot).toBeCalledWith('23'));
  });

  it('does not render author text when current user is not author', async () => {
    render(<Knot knotId="7839" />);

    await waitFor(() => {
      expect(
        screen.queryByText('you are the author of this knot'),
      ).not.toBeInTheDocument();
    });
  });

  it('renders author text when current user is author', async () => {
    render(<Knot knotId="789" />);
    const authorText = await screen.findByText(
      'you are the author of this knot',
    );

    expect(authorText).toBeInTheDocument();
  });
});