import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import BoxRegularView from '../../components/Boxes/BoxRegularView';

const mockLeaveBox = jest.fn();
const mockJoinBox = jest.fn();

jest.mock('../../utils/firebase', () => ({
  leaveBox: (boxId: string) => mockLeaveBox(boxId),
  joinBox: (boxId: string) => mockJoinBox(boxId),
}));

jest.mock('../../context/BoxContext', () => ({
  useBox: () => ({
    name: 'test box',
    description: 'test description',
    id: '111',
  }),
}));

const mockUseUserAnon = jest.fn();

jest.mock('../../context/UserContext', () => ({
  useUserAnon: () => mockUseUserAnon(),
}));

describe('test BoxContent renders', () => {
  it('renders correct name and description', () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin
        isCurrentUserMember
      />,
    );

    const name = screen.getByRole('heading', { name: 'test box' });
    const description = screen.queryByText('test description');

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('invokes onButtonClick function when create string button clicks', () => {
    const mockHandler = jest.fn();
    render(
      <BoxRegularView
        onButtonClick={mockHandler}
        isCurrentUserAdmin
        isCurrentUserMember
      />,
    );
    const button = screen.getByRole('button', {
      name: 'Start a string in test box',
    });

    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('does not invoke onButtonClick function when create string button clicks because user is anonymous/guest', () => {
    mockUseUserAnon.mockImplementation(() => true);
    const mockHandler = jest.fn();

    render(
      <BoxRegularView
        onButtonClick={mockHandler}
        isCurrentUserAdmin
        isCurrentUserMember
      />,
    );
    const button = screen.getByRole('button', {
      name: 'Start a string in test box',
    });

    userEvent.click(button);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('does not render join or leave button when user is admin', () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin
        isCurrentUserMember
      />,
    );

    const joinButton = screen.queryByRole('button', { name: 'Join Box' });
    const leaveButton = screen.queryByRole('button', { name: 'Leave Box' });

    expect(joinButton).not.toBeInTheDocument();
    expect(leaveButton).not.toBeInTheDocument();
  });

  it('renders join button when user is not admin and is not member', () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin={false}
        isCurrentUserMember={false}
      />,
    );

    const joinButton = screen.getByRole('button', { name: 'Join Box' });
    const leaveButton = screen.queryByRole('button', { name: 'Leave Box' });

    expect(joinButton).toBeInTheDocument();
    expect(leaveButton).not.toBeInTheDocument();
  });

  it('invokes firebase.joinBox with correct argument when join button clicks', async () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin={false}
        isCurrentUserMember={false}
      />,
    );

    const joinButton = screen.getByRole('button', { name: 'Join Box' });
    userEvent.click(joinButton);

    await waitFor(() => expect(mockJoinBox).toHaveBeenCalledWith('111'));
  });

  it('renders leave button when user is not admin but is member', () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin={false}
        isCurrentUserMember
      />,
    );

    const joinButton = screen.queryByRole('button', { name: 'Join Box' });
    const leaveButton = screen.getByRole('button', { name: 'Leave Box' });

    expect(joinButton).not.toBeInTheDocument();
    expect(leaveButton).toBeInTheDocument();
  });

  it('invokes firebase.leaveBox with correct argument when leave button clicks', async () => {
    render(
      <BoxRegularView
        onButtonClick={() => {}}
        isCurrentUserAdmin={false}
        isCurrentUserMember
      />,
    );

    const leaveButton = screen.getByRole('button', { name: 'Leave Box' });
    userEvent.click(leaveButton);

    await waitFor(() => expect(mockLeaveBox).toHaveBeenCalledWith('111'));
  });
});
