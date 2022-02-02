import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxDelete from '../../components/Boxes/BoxDelete';

const mockFn = jest.fn();

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    id: '123',
  }),
}));

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return <a href={to}>{children}</a>;
  },
}));

jest.mock('../../utils/firebase', () => ({
  deleteBox: (id: string) => mockFn(id),
}));

describe('tests BoxDelete component', () => {
  it('renders box has been deleted text when button clicks', async () => {
    render(<BoxDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    const heading = await screen.findByRole('heading', {
      name: 'the box has been deleted',
    });
    expect(heading).toBeInTheDocument();
  });

  it('invokes deleteBox firebase method with box id', async () => {
    render(<BoxDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    await waitFor(() => expect(mockFn).toHaveBeenCalledWith('123'));
  });
});
