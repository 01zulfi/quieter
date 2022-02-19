import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import BoxAdminView from '../../components/Boxes/BoxAdminView';

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
  '../../components/Boxes/BoxEdit',
  () =>
    function BoxEditMock() {
      return <h2>BoxEdit component rendered</h2>;
    },
);

jest.mock(
  '../../components/Boxes/BoxDelete',
  () =>
    function BoxDeleteMock() {
      return <h2>BoxDelete component rendered</h2>;
    },
);

describe('tests BoxAdminView component', () => {
  it('renders BoxEdit component when edit button is clicked', () => {
    render(<BoxAdminView />);
    const editButton = screen.getByRole('button', { name: 'Edit box details' });

    userEvent.click(editButton);

    const heading = screen.getByRole('heading', {
      name: 'BoxEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  it('unmounts BoxEdit when close modal button for BoxEdit clicks', () => {
    render(<BoxAdminView />);
    const editButton = screen.getByRole('button', { name: 'Edit box details' });

    userEvent.click(editButton);

    const heading = screen.getByRole('heading', {
      name: 'BoxEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const boxDeleteText = screen.queryByText('BoxDelete component rendered');
    const adminText = screen.queryByText('you are the admin of this box');

    expect(boxDeleteText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(adminText).toBeInTheDocument();
  });

  it('renders BoxDelete component when delete button is clicked', () => {
    render(<BoxAdminView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete box' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'BoxDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('unmounts BoxDelete when close modal button for BoxDelete clicks', () => {
    render(<BoxAdminView />);
    const deleteButton = screen.getByRole('button', { name: 'Delete box' });

    userEvent.click(deleteButton);

    const heading = screen.getByRole('heading', {
      name: 'BoxDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    const boxEditText = screen.queryByText('BoxEdit component rendered');
    const adminText = screen.queryByText('you are the admin of this box');

    expect(boxEditText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(adminText).toBeInTheDocument();
  });
});
