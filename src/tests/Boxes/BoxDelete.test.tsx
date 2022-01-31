import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxDelete from '../../components/Boxes/BoxDelete';

const mockFn = jest.fn();

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    id: '123',
  }),
}));

jest.mock('../../utils/firebase', () => ({
  deleteBox: (id: string) => mockFn(id),
}));

describe('tests BoxDelete component', () => {
  test('renders box has been deleted text when button clicks', () => {
    const { getByRole } = render(<BoxDelete />);
    const deleteButton = getByRole('button');

    userEvent.click(deleteButton);

    const heading = getByRole('heading', { name: 'the box has been deleted' });
    expect(heading).toBeInTheDocument();
  });

  test('invokes deleteBox firebase method with box id', () => {
    const { getByRole } = render(<BoxDelete />);
    const deleteButton = getByRole('button');

    userEvent.click(deleteButton);

    expect(mockFn).toHaveBeenCalledWith('123');
  });
});
