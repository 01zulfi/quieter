import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '../../utils/test-utils';
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

describe('tests BoxEdit component', () => {
  it('inputs has correct values', () => {
    render(<BoxEdit closeModal={() => {}} />);

    const nameEditInput = screen.getAllByRole('textbox')[0];
    const descriptionEditInput = screen.getAllByRole('textbox')[1];

    expect(nameEditInput).toHaveValue('test test');
    expect(descriptionEditInput).toHaveValue('lorem ipsum test string content');
  });

  it('editString is called with correct values after edit submits', async () => {
    render(<BoxEdit closeModal={() => {}} />);
    const nameEditInput = screen.getAllByRole('textbox')[0];
    const descriptionEditInput = screen.getAllByRole('textbox')[1];
    const button = screen.getByRole('button');

    userEvent.type(nameEditInput, '{selectall}{backspace}');
    userEvent.type(nameEditInput, 'edited name');
    userEvent.type(descriptionEditInput, '{selectall}{backspace}');
    userEvent.type(descriptionEditInput, 'edited desc');
    userEvent.click(button);

    await waitFor(() => {
      expect(mockEditBox).toHaveBeenCalledWith('123', {
        name: 'edited name',
        description: 'edited desc',
      });
    });
  });

  it('invokes closeModal when submit button clicks', async () => {
    const mockCloseModal = jest.fn();
    render(<BoxEdit closeModal={mockCloseModal} />);
    const button = screen.getByRole('button', { name: 'Edit box' });

    userEvent.click(button);

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalledTimes(1));
  });
});
