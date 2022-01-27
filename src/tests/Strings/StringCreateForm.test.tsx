import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StringCreateForm from '../../components/Strings/StringCreateForm';

describe('tests StringCreateForm component', () => {
  test('textarea has correct values', () => {
    const { getByPlaceholderText } = render(<StringCreateForm />);
    const textarea = getByPlaceholderText(
      'start a string by writing something here',
    );

    userEvent.type(textarea, 'this{space}is{space}a{space}test');

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
