import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import String from '../../components/Strings/String';

describe('test String component', () => {
  test('title and content renders', () => {
    const testTitle = 'This is a test string';
    const testContent = 'this is a test content, this is tes';

    const { getByRole, getByText } = render(
      <String title={testTitle} content={testContent} />,
    );

    const queryTitle = getByRole('heading', { name: 'This is a test string' });
    const queryContent = getByText(/this is a test content, this/i);

    expect(queryTitle).toBeInTheDocument();
    expect(queryContent).toBeInTheDocument();
  });
});
