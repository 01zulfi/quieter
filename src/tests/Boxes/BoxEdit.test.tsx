import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxEdit from '../../components/Boxes/BoxEdit';

const mockEditBox = jest.fn();
// const mockNavigate = jest.fn();

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

jest.mock('../../utils/firebase', () => ({
  editBox: async (
    boxId: string,
    { name, description }: { name: string; description: string },
  ) => mockEditBox(boxId, { name, description }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

describe('tests BoxEdit component', () => {
  test('inputs has correct values', () => {
    const { getAllByRole } = render(<BoxEdit />);

    const nameEditInput = getAllByRole('textbox')[0];
    const descriptionEditInput = getAllByRole('textbox')[1];

    expect(nameEditInput).toHaveValue('test test');
    expect(descriptionEditInput).toHaveValue('lorem ipsum test string content');
  });

  test('editString is called with correct values after edit submits', () => {
    const { getAllByRole, getByRole } = render(<BoxEdit />);
    const nameEditInput = getAllByRole('textbox')[0];
    const descriptionEditInput = getAllByRole('textbox')[1];
    const button = getByRole('button');

    userEvent.type(nameEditInput, '{selectall}{backspace}');
    userEvent.type(nameEditInput, 'edited name');
    userEvent.type(descriptionEditInput, '{selectall}{backspace}');
    userEvent.type(descriptionEditInput, 'edited desc');
    userEvent.click(button);

    expect(mockEditBox).toHaveBeenCalledWith('123', {
      name: 'edited name',
      description: 'edited desc',
    });
  });
});
