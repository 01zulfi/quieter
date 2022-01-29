import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import firebase from '../../utils/firebase';
import BoxDelete from '../../components/Boxes/BoxDelete';

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    id: '123',
  }),
}));

const spy = jest.spyOn(firebase, 'deleteBox');

describe('tests BoxDelete component', () => {
  test('renders box has been deleted text when button clicks', () => {
    const { getByRole } = render(<BoxDelete />);
    const deleteButton = getByRole('button');

    userEvent.click(deleteButton);

    const heading = getByRole('heading', { name: 'the box has been deleted' });
    expect(heading).toBeInTheDocument();
  });

  test('invokes deleteBox firebase method with box id', () => {
    const { getByRole } = render(<BoxDelete />);
    const deleteButton = getByRole('button');

    userEvent.click(deleteButton);

    expect(spy).toHaveBeenCalledWith('123');
  });
});
