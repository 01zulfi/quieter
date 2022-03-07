import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringEdit from '../../components/Strings/StringEdit';

const mockEditString = jest.fn();
const mockGetString = jest.fn();

const mockString = {
  id: '123',
  title: 'test test',
  content: 'lorem ipsum test string content',
};

jest.mock('../../context/StringContext', () => ({
  useString: () => mockGetString(),
}));

jest.mock('../../utils/firebase', () => ({
  editString: async ({
    stringId,
    title,
    content,
  }: {
    stringId: string;
    title: string;
    content: string;
  }) => mockEditString({ stringId, title, content }),
}));

describe('tests StringEdit component', () => {
  it('input and textarea has correct values', () => {
    mockGetString.mockImplementation(() => mockString);
    const mockCloseModal = jest.fn();
    render(<StringEdit closeModal={mockCloseModal} />);

    const input = screen.getAllByRole('textbox')[0];
    const textarea = screen.getAllByRole('textbox')[1];

    expect(input).toHaveValue('test test');
    expect(textarea).toHaveValue('lorem ipsum test string content');
  });

  it('returns unable to load message when string is null', () => {
    mockGetString.mockImplementation(() => null);
    const mockCloseModal = jest.fn();
    render(<StringEdit closeModal={mockCloseModal} />);

    const message = screen.getByRole('heading', {
      name: 'Unable to load, try refreshing.',
    });

    expect(message).toBeInTheDocument();
  });

  it('invokes closeModal function when form submits', async () => {
    mockGetString.mockImplementation(() => mockString);
    const mockCloseModal = jest.fn();
    render(<StringEdit closeModal={mockCloseModal} />);

    const submitButton = screen.getByRole('button', { name: 'Submit changes' });
    userEvent.click(submitButton);

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalledTimes(1));
  });

  it('invokes editString with correct arguments after editing', async () => {
    mockGetString.mockImplementation(() => mockString);
    const mockCloseModal = jest.fn();
    render(<StringEdit closeModal={mockCloseModal} />);
    const input = screen.getAllByRole('textbox')[0];
    const textarea = screen.getAllByRole('textbox')[1];
    const submitButton = screen.getByRole('button', { name: 'Submit changes' });

    userEvent.type(input, '{selectall}{backspace}');
    userEvent.type(input, 'edited title');
    userEvent.type(textarea, '{selectall}{backspace}');
    userEvent.type(textarea, 'edited content');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(mockEditString).toHaveBeenCalledWith({
        stringId: '123',
        title: 'edited title',
        content: 'edited content',
      }),
    );
  });
});
