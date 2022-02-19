import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import BoxRegularView from '../../components/Boxes/BoxRegularView';

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({ name: 'test box', description: 'test description' }),
}));

describe('test BoxContent renders', () => {
  test('correct name and description renders', () => {
    const { getByRole, queryByText } = render(
      <BoxRegularView onButtonClick={() => {}} />,
    );

    const name = getByRole('heading', { name: 'test box' });
    const description = queryByText('test description');

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('invokes onButtonClick function when button clicks', () => {
    const mockHandler = jest.fn();
    const { getByRole } = render(
      <BoxRegularView onButtonClick={mockHandler} />,
    );
    const button = getByRole('button', { name: 'Start a string in test box' });

    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
