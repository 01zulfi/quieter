import React from 'react';
import { screen, render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import String from '../../components/Strings/String';

const mockUseString = jest.fn();

jest.mock('../../context/StringContext', () => ({
  useString: () => mockUseString(),
}));

describe('test String component', () => {
  it('renders title and content', () => {
    mockUseString.mockImplementation(() => ({
      title: 'This is a test  string',
      content: 'this is a test content, this',
    }));
    render(<String />);

    const queryTitle = screen.getByRole('heading', {
      name: 'This is a test string',
    });
    const queryContent = screen.getByText(/this is a test content, this/i);

    expect(queryTitle).toBeInTheDocument();
    expect(queryContent).toBeInTheDocument();
  });

  it('renders error message when string is null', () => {
    mockUseString.mockImplementation(() => null);
    render(<String />);
    const queryTitle = screen.getByRole('heading', {
      name: 'Unable to load, try refreshing.',
    });
    expect(queryTitle).toBeInTheDocument();
  });
});
