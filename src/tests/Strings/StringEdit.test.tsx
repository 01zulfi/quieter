import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringEdit from '../../components/Strings/StringEdit';

const mockFn = jest.fn();

const mockString = {
  id: '123',
  title: 'test test',
  content: 'lorem ipsum test string content',
};

jest.mock('../../context/StringContext', () => ({
  useString: () => ({
    ...mockString,
  }),
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
  }) => mockFn({ stringId, title, content }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

describe('tests StringEdit component', () => {
  it('input and textarea has correct values', () => {
    render(<StringEdit />);

    const input = screen.getAllByRole('textbox')[0];
    const textarea = screen.getAllByRole('textbox')[1];

    expect(input).toHaveValue('test test');
    expect(textarea).toHaveValue('lorem ipsum test string content');
  });

  it('invokes editString with correct arguments after editing', async () => {
    render(<StringEdit />);
    const input = screen.getAllByRole('textbox')[0];
    const textarea = screen.getAllByRole('textbox')[1];
    const submitButton = screen.getByRole('button', { name: 'Submit changes' });

    userEvent.type(input, '{selectall}{backspace}');
    userEvent.type(input, 'edited title');
    userEvent.type(textarea, '{selectall}{backspace}');
    userEvent.type(textarea, 'edited content');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(mockFn).toHaveBeenCalledWith({
        stringId: '123',
        title: 'edited title',
        content: 'edited content',
      }),
    );
  });
});
