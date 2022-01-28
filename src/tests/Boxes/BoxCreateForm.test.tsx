import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxCreateForm from '../../components/Boxes/BoxCreateForm';

describe('tests BoxCreateForm component', () => {
  test('textarea and input has correct values', () => {
    const { getByPlaceholderText } = render(<BoxCreateForm />);
    const nameInput = getByPlaceholderText("enter box's name here");
    const descriptionInput = getByPlaceholderText('description goes here');

    userEvent.type(nameInput, 'test{space}title');
    userEvent.type(descriptionInput, 'this{space}is{space}a{space}test');

    expect(nameInput).toHaveValue('test title');
    expect(descriptionInput).toHaveValue('this is a test');
  });

  test('renders success text when form submits', () => {
    const { getByRole } = render(<BoxCreateForm />);
    const button = getByRole('button', { name: 'Create box' });

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const successHeading = getByRole('heading', {
      name: 'Success! The box has been created.',
    });

    expect(button).not.toBeInTheDocument();
    expect(successHeading).toBeInTheDocument();
  });
});
