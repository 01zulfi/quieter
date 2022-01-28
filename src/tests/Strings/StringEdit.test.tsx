import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StringEdit from '../../components/Strings/StringEdit';

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

describe('tests StringEdit component', () => {
  test('input and textarea has correct values', () => {
    const { getAllByRole } = render(<StringEdit />);

    const input = getAllByRole('textbox')[0];
    const textarea = getAllByRole('textbox')[1];

    expect(input).toHaveValue('test test');
    expect(textarea).toHaveValue('lorem ipsum test string content');
  });
});
