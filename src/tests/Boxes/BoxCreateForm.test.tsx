import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxCreateForm from '../../components/Boxes/BoxCreateForm';

const mockCreateBox = jest.fn();

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return <a href={to}>{children}</a>;
  },
}));

jest.mock('../../utils/unique-id', () => () => '123');

jest.mock('../../utils/firebase', () => ({
  createBox: async ({
    boxId,
    name,
    description,
  }: {
    boxId: string;
    name: string;
    description: string;
  }) => mockCreateBox({ boxId, name, description }),
}));

describe('tests BoxCreateForm component', () => {
  it('textarea and input has correct values', () => {
    render(<BoxCreateForm />);
    const nameInput = screen.getByPlaceholderText("enter box's name here");
    const descriptionInput = screen.getByPlaceholderText(
      'description goes here',
    );

    userEvent.type(nameInput, 'test{space}title');
    userEvent.type(descriptionInput, 'this{space}is{space}a{space}test');

    expect(nameInput).toHaveValue('test title');
    expect(descriptionInput).toHaveValue('this is a test');
  });

  it('renders success text when form submits', async () => {
    render(<BoxCreateForm />);
    const button = screen.getByRole('button', { name: 'Create box' });

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const successHeading = await screen.findByRole('heading', {
      name: 'Success! The box has been created.',
    });

    expect(button).not.toBeInTheDocument();
    expect(successHeading).toBeInTheDocument();
  });

  it('invokes firebase.createBox with correct argument', async () => {
    render(<BoxCreateForm />);
    const nameInput = screen.getByPlaceholderText("enter box's name here");
    const descriptionInput = screen.getByPlaceholderText(
      'description goes here',
    );
    const button = screen.getByRole('button', { name: 'Create box' });

    userEvent.type(nameInput, 'test{space}title');
    userEvent.type(descriptionInput, 'this{space}is{space}a{space}test');
    userEvent.click(button);

    await waitFor(() =>
      expect(mockCreateBox).toHaveBeenCalledWith({
        boxId: '123',
        name: 'test title',
        description: 'this is a test',
      }),
    );
  });
});
