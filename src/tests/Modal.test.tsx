import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import '@testing-library/jest-dom';
import Modal from '../components/Modal';

describe('tests modal component', () => {
  test('renders children correctly', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Modal closeModal={() => {}}>
        <h1>Testing modal</h1>
        <input type="text" placeholder="testing input" />
      </Modal>,
    );
    const heading = getByRole('heading', { name: 'Testing modal' });
    const input = getByPlaceholderText('testing input');

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('invokes close modal function', () => {
    const closeModalMock = jest.fn();
    const { getByRole } = render(<Modal closeModal={closeModalMock} />);

    const closeButton = getByRole('button', { name: 'Close' });
    userEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
