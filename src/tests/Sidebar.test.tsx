import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar';

jest.mock(
  '../components/Boxes/BoxCreateModal',
  () =>
    function BoxCreateModalMock({ closeModal }: { closeModal: any }) {
      return (
        <>
          <h2>BoxCreateModal component rendered</h2>
          <button type="button" onClick={closeModal}>
            close modal mock
          </button>
        </>
      );
    },
);

describe('tests Sidebar component', () => {
  it('renders BoxCreateModal component when create box button clicks', () => {
    render(<Sidebar />);
    const createBoxButton = screen.getByRole('button', {
      name: 'Create box',
    });

    userEvent.click(createBoxButton);

    expect(
      screen.getByRole('heading', {
        name: 'BoxCreateModal component rendered',
      }),
    ).toBeInTheDocument();
  });

  it('dismounts BoxCreateModal component when close modal button clicks', () => {
    render(<Sidebar />);
    const createBoxButton = screen.getByRole('button', {
      name: 'Create box',
    });

    userEvent.click(createBoxButton);

    const closeModalButton = screen.getByRole('button', {
      name: 'close modal mock',
    });

    userEvent.click(closeModalButton);

    expect(
      screen.queryByRole('heading', {
        name: 'BoxCreateModal component rendered',
      }),
    ).not.toBeInTheDocument();
  });
});
