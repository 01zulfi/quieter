import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import String from '../../components/Strings/String';

jest.mock('../../context/StringContext', () => ({
  useString: () => ({
    title: 'This is a test  string',
    content: 'this is a test content, this',
  }),
}));

describe('test String component', () => {
  test('title and content renders', () => {
    const { getByRole, getByText } = render(<String />);

    const queryTitle = getByRole('heading', { name: 'This is a test string' });
    const queryContent = getByText(/this is a test content, this/i);

    expect(queryTitle).toBeInTheDocument();
    expect(queryContent).toBeInTheDocument();
  });
});
