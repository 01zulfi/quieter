import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoxEdit from '../../components/Boxes/BoxEdit';

const mockBox = {
  id: '123',
  name: 'test test',
  description: 'lorem ipsum test string content',
};

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    ...mockBox,
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => {},
}));

describe('tests BoxEdit component', () => {
  test('inputs has correct values', () => {
    const { getAllByRole } = render(<BoxEdit />);

    const nameEditInput = getAllByRole('textbox')[0];
    const descriptionEditInput = getAllByRole('textbox')[1];

    expect(nameEditInput).toHaveValue('test test');
    expect(descriptionEditInput).toHaveValue('lorem ipsum test string content');
  });
});
