import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../utils/test-utils';
import '@testing-library/jest-dom';
import Button from '../components/Button';

describe('button component tests', () => {
  it('renders correct text content', () => {
    render(
      <Button
        type="button"
        textContent="Click Me"
        clickHandler={(): void => {}}
        status="primary"
      />,
    );
    const button = screen.getByRole('button', { name: 'Click Me' });

    expect(button).toHaveTextContent('Click Me');
  });

  it('has correct type', () => {
    render(
      <Button
        type="submit"
        textContent=""
        clickHandler={(): void => {}}
        status="primary"
      />,
    );
    const button = screen.getByRole('button');

    expect(button.getAttribute('type')).toMatch(/submit/);
  });

  it('invokes click handler', () => {
    const mockClickFn = jest.fn();
    render(
      <Button
        type="button"
        textContent=""
        clickHandler={mockClickFn}
        status="primary"
      />,
    );
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });
});
