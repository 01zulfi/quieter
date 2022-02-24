import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../utils/test-utils';
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
  });

  it('unmounts StringEdit when close modal button for StringEdit clicks', () => {
    render(<StringAuthorView />);
    const editButton = screen.getByRole('button', { name: 'Edit' });

    userEvent.click(editButton);

    const heading = screen.getByRole('heading', {
      name: 'StringEdit component rendered',
    });
    expect(heading).toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const stringDeleteText = screen.queryByText(
      'StringDelete component rendered',
    );

    expect(stringDeleteText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
  });

  it('renders StringDelete component when delete button is clicked', () => {
    render(<StringAuthorView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'StringDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
  });

  it('unmounts StringDelete when close modal button for StringDelete clicks', () => {
    render(<StringAuthorView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'StringDelete component rendered',
    });
    expect(heading).toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const stringEditText = screen.queryByText('StringEdit component rendered');

    expect(stringEditText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
  });
});
