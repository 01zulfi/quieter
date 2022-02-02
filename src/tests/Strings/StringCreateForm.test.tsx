import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StringCreateForm from '../../components/Strings/StringCreateForm';

const mockCreateString = jest.fn();

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return <a href={to}>{children}</a>;
  },
}));

jest.mock('../../utils/unique-id', () => () => '123');

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    id: '456',
  }),
}));

jest.mock('../../utils/firebase', () => ({
  createString: async ({
    boxId,
    stringId,
    title,
    content,
  }: {
    boxId: string;
    title: string;
    stringId: string;
    content: string;
  }) => mockCreateString({ stringId, boxId, title, content }),
}));

describe('tests StringCreateForm component', () => {
  it('textarea and input has correct values', () => {
    render(<StringCreateForm />);
    const input = screen.getByPlaceholderText('give a title to your string');
    const textarea = screen.getByPlaceholderText(
      'populate your string with content by writing something here',
    );

    userEvent.type(input, 'test{space}title');
    userEvent.type(textarea, 'this{space}is{space}a{space}test');

    expect(input).toHaveValue('test title');
    expect(textarea).toHaveValue('this is a test');
  });

  it('renders success text when form submits', async () => {
    render(<StringCreateForm />);
    const button = screen.getByRole('button', { name: 'Start String' });

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const successHeading = await screen.findByRole('heading', {
      name: 'Success! Your string has started.',
    });

    expect(button).not.toBeInTheDocument();
    expect(successHeading).toBeInTheDocument();
  });

  it('invokes firebase.createString method with correct arguments', async () => {
    render(<StringCreateForm />);
    const input = screen.getByPlaceholderText('give a title to your string');
    const textarea = screen.getByPlaceholderText(
      'populate your string with content by writing something here',
    );
    const button = screen.getByRole('button', { name: 'Start String' });

    userEvent.type(input, 'test{space}title');
    userEvent.type(textarea, 'this{space}is{space}a{space}test');
    userEvent.click(button);

    await waitFor(() =>
      expect(mockCreateString).toHaveBeenCalledWith({
        boxId: '456',
        stringId: '123',
        title: 'test title',
        content: 'this is a test',
      }),
    );
  });
});
