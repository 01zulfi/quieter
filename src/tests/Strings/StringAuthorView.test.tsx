import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StringAuthorView from '../../components/Strings/StringAuthorView';

jest.mock(
  '../../components/Modal',
  () =>
    function ModalMock({
      closeModal,
      children,
    }: {
      closeModal: any;
      children: any;
    }) {
      return (
        <>
          {children}
          <button type="button" onClick={closeModal}>
            close modal mock
          </button>
        </>
      );
    },
);

jest.mock(
  '../../components/Strings/StringEdit',
  () =>
    function StringEditMock() {
      return <h2>StringEdit component rendered</h2>;
    },
);

jest.mock(
  '../../components/Strings/StringDelete',
  () =>
    function StringDeleteMock() {
      return <h2>StringDelete component rendered</h2>;
    },
);

describe('tests StringAuthorView component', () => {
  it('renders StringEdit component when edit button is clicked', () => {
    render(<StringAuthorView />);
    const editButton = screen.getByRole('button', { name: 'Edit' });

    userEvent.click(editButton);

    const heading = screen.getByRole('heading', {
      name: 'StringEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  it('unmounts StringEdit when close modal button for StringEdit clicks', () => {
    render(<StringAuthorView />);
    const editButton = screen.getByRole('button', { name: 'Edit' });

    userEvent.click(editButton);

    const heading = screen.getByRole('heading', {
      name: 'StringEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const stringDeleteText = screen.queryByText(
      'StringDelete component rendered',
    );
    const authorText = screen.queryByText('you are the author of this string');

    expect(stringDeleteText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(authorText).toBeInTheDocument();
  });

  it('renders StringDelete component when delete button is clicked', () => {
    render(<StringAuthorView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'StringDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('unmounts StringDelete when close modal button for StringDelete clicks', () => {
    render(<StringAuthorView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'StringDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const stringEditText = screen.queryByText('StringEdit component rendered');
    const authorText = screen.queryByText('you are the author of this string');

    expect(stringEditText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(authorText).toBeInTheDocument();
  });
});
