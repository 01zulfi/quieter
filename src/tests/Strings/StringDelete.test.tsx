import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringDelete from '../../components/Strings/StringDelete';

const mockDeleteString = jest.fn();
const mockUseString = jest.fn();

jest.mock('../../context/StringContext', () => ({
  useString: () => mockUseString(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

jest.mock('../../utils/firebase', () => ({
  deleteString: (id: string) => mockDeleteString(id),
}));

describe('tests StringDelete component', () => {
  it('renders unable to load message when string is null', () => {
    mockUseString.mockImplementation(() => undefined);
    render(<StringDelete />);
    const message = screen.getByRole('heading', {
      name: 'Unable to load, try refreshing.',
    });

    expect(message).toBeInTheDocument();
  });

  it('invokes deleteString firebase method with string id', async () => {
    mockUseString.mockImplementation(() => ({
      id: '0123',
      associatedBox: { id: '000' },
    }));
    render(<StringDelete />);
    const deleteButton = screen.getByRole('button');

    userEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteString).toHaveBeenCalledWith('0123'));
  });
});
