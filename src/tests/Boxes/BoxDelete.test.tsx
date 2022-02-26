import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import BoxDelete from '../../components/Boxes/BoxDelete';

const mockFn = jest.fn();

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    id: '123',
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

jest.mock('../../utils/firebase', () => ({
  deleteBox: (id: string) => mockFn(id),
}));

describe('tests BoxDelete component', () => {
  it('invokes deleteBox firebase method with box id', async () => {
    render(<BoxDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    await waitFor(() => expect(mockFn).toHaveBeenCalledWith('123'));
  });
});
