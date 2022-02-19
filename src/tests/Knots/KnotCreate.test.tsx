import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../../utils/test-utils';
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
    content,
  }: {
    stringId: string;
    content: string;
  }) => mockCreateKnot({ stringId, content }),
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
        content: 'knot content test',
      }),
    );
  });
});
