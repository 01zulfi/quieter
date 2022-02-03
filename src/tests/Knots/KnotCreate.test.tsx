import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import KnotCreate from '../../components/Knots/KnotCreate';

const mockCreateKnot = jest.fn();

jest.mock('../../context/StringContext', () => ({
  useString: () => ({
    id: '1234',
  }),
}));

jest.mock('../../utils/firebase', () => ({
  createKnot: async ({
    stringId,
    knotContent,
  }: {
    stringId: string;
    knotContent: string;
  }) => mockCreateKnot({ stringId, knotContent }),
}));

describe('KnotCreate component', () => {
  it('invokes firebase.createKnot with correct argument', async () => {
    render(<KnotCreate />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(input, 'knot content test');
    userEvent.click(button);

    await waitFor(() =>
      expect(mockCreateKnot).toHaveBeenCalledWith({
        stringId: '1234',
        knotContent: 'knot content test',
      }),
    );
  });
});
