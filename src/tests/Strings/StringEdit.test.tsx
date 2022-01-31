import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  editString: async (
    id: string,
    { title, content }: { title: string; content: string },
  ) => mockFn(id, { title, content }),
}));

describe('tests StringEdit component', () => {
  test('input and textarea has correct values', () => {
    const { getAllByRole } = render(<StringEdit />);

    const input = getAllByRole('textbox')[0];
    const textarea = getAllByRole('textbox')[1];

    expect(input).toHaveValue('test test');
    expect(textarea).toHaveValue('lorem ipsum test string content');
  });

  test('invokes string with correct arguments after editing', () => {
    const { getAllByRole, getByRole } = render(<StringEdit />);
    const input = getAllByRole('textbox')[0];
    const textarea = getAllByRole('textbox')[1];
    const submitButton = getByRole('button', { name: 'Submit changes' });

    userEvent.type(input, '{selectall}{backspace}');
    userEvent.type(input, 'edited title');
    userEvent.type(textarea, '{selectall}{backspace}');
    userEvent.type(textarea, 'edited content');
    userEvent.click(submitButton);

    expect(mockFn).toHaveBeenCalledWith('123', {
      title: 'edited title',
      content: 'edited content',
    });
  });
});
