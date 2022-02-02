import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BoxEdit from '../../components/Boxes/BoxEdit';

const mockEditBox = jest.fn();

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
  editBox: async ({
    boxId,
    name,
    description,
  }: {
    name: string;
    description: string;
    boxId: string;
  }) => mockEditBox(boxId, { name, description }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

describe('tests BoxEdit component', () => {
  it('inputs has correct values', () => {
    render(<BoxEdit />);

    const nameEditInput = screen.getAllByRole('textbox')[0];
    const descriptionEditInput = screen.getAllByRole('textbox')[1];

    expect(nameEditInput).toHaveValue('test test');
    expect(descriptionEditInput).toHaveValue('lorem ipsum test string content');
  });

  it('editString is called with correct values after edit submits', () => {
    render(<BoxEdit />);
    const nameEditInput = screen.getAllByRole('textbox')[0];
    const descriptionEditInput = screen.getAllByRole('textbox')[1];
    const button = screen.getByRole('button');

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
