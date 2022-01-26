import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from '../components/Button';

describe('button component tests', () => {
  test('renders correct text content', () => {
    const { getByRole } = render(
      <Button
        type="button"
        textContent="Click Me"
        clickHandler={(): void => {}}
      />,
    );
    const button = getByRole('button', { name: 'Click Me' });

    expect(button).toHaveTextContent('Click Me');
  });

  test('has correct type', () => {
    const { getByRole } = render(
      <Button type="submit" textContent="" clickHandler={(): void => {}} />,
    );
    const button = getByRole('button');

    expect(button.getAttribute('type')).toMatch(/submit/);
  });

  test('invokes click handler', () => {
    const mockClickFn = jest.fn();
    const { getByRole } = render(
      <Button type="button" textContent="" clickHandler={mockClickFn} />,
    );
    const button = getByRole('button');

    userEvent.click(button);

    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });
});
