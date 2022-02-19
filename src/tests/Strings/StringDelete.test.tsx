import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringDelete from '../../components/Strings/StringDelete';

const mockDeleteString = jest.fn();

jest.mock('../../context/StringContext', () => ({
  useString: () => ({
    id: '0123',
  }),
}));

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return <a href={to}>{children}</a>;
  },
}));

jest.mock('../../utils/firebase', () => ({
  deleteString: (id: string) => mockDeleteString(id),
}));

describe('tests StringDelete component', () => {
  it('renders string has been deleted text when button clicks', async () => {
    render(<StringDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    const heading = await screen.findByRole('heading', {
      name: 'the string has been deleted',
    });
    expect(heading).toBeInTheDocument();
  });

  it('invokes deleteString firebase method with string id', async () => {
    render(<StringDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteString).toHaveBeenCalledWith('0123'));
  });
});
