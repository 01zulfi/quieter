import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    function BoxEditMock() {
      return <h2>BoxDelete component rendered</h2>;
    },
);

describe('tests BoxAdminView component', () => {
  test('clicking edit button renders BoxEdit component', () => {
    const { getByRole } = render(<BoxAdminView />);
    const editButton = getByRole('button', { name: 'Edit box details' });

    userEvent.click(editButton);

    const heading = getByRole('heading', {
      name: 'BoxEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  test('unmounts BoxEdit when close modal for BoxEdit clicks', () => {
    const { getByRole, queryByText } = render(<BoxAdminView />);
    const editButton = getByRole('button', { name: 'Edit box details' });

    userEvent.click(editButton);

    const heading = getByRole('heading', {
      name: 'BoxEdit component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();

    const closeModalButton = getByRole('button', { name: 'close modal mock' });

    userEvent.click(closeModalButton);

    const boxDeleteText = queryByText('BoxDelete component rendered');
    const adminText = queryByText('you are the admin of this box');

    expect(boxDeleteText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(adminText).toBeInTheDocument();
  });

  test('clicking delete button renders BoxDelete component', () => {
    const { getByRole } = render(<BoxAdminView />);
    const deleteButton = getByRole('button', { name: 'Delete box' });

    userEvent.click(deleteButton);

    const heading = getByRole('heading', {
      name: 'BoxDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test('unmounts BoxDelete when close modal for BoxDelete clicks', () => {
    const { getByRole, queryByText } = render(<BoxAdminView />);
    const deleteButton = getByRole('button', { name: 'Delete box' });

    userEvent.click(deleteButton);

    const heading = getByRole('heading', {
      name: 'BoxDelete component rendered',
    });
    expect(heading).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    const closeModalButton = getByRole('button', { name: 'close modal mock' });

    userEvent.click(closeModalButton);

    const boxEditText = queryByText('BoxEdit component rendered');
    const adminText = queryByText('you are the admin of this box');

    expect(boxEditText).not.toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    expect(adminText).toBeInTheDocument();
  });
});
