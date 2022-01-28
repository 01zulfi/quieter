import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StringCreateForm from '../../components/Strings/StringCreateForm';

describe('tests StringCreateForm component', () => {
  test('textarea and input has correct values', () => {
    const { getByPlaceholderText } = render(<StringCreateForm />);
    const input = getByPlaceholderText('give a title to your string');
    const textarea = getByPlaceholderText(
      'populate your string with content by writing something here',
    );

    userEvent.type(input, 'test{space}title');
    userEvent.type(textarea, 'this{space}is{space}a{space}test');

    expect(input).toHaveValue('test title');
    expect(textarea).toHaveValue('this is a test');
  });

  test('renders success text when form submits', () => {
    const { getByRole } = render(<StringCreateForm />);
    const button = getByRole('button', { name: 'Start String' });

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const successHeading = getByRole('heading', {
      name: 'Success! Your string has started.',
    });

    expect(button).not.toBeInTheDocument();
    expect(successHeading).toBeInTheDocument();
  });
});
