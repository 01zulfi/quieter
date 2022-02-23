import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import Knot from '../../components/Knots/Knot';

jest.mock(
  '../../components/Loading',
  () =>
    function LoadingMock() {
      return <h3>Loading component rendered</h3>;
    },
);

jest.mock('react-router-dom', () => ({
  Link: function LinkMock({ to, children }: { to: string; children: any }) {
    return (
      <>
        {to}
        {children}
      </>
    );
  },
}));

jest.mock(
  '../../components/StyledLink',
  () =>
    function StyledLinkMock({
      size,
      bold,
      children,
    }: {
      size: string;
      bold: string;
      children: any;
    }) {
      return (
        <>
          {size}
          {bold}
          {children}
        </>
      );
    },
);

const mockGetKnot = jest.fn();
const mockUseUserAnon = jest.fn();
const mockDeleteKnot = jest.fn();

jest.mock('../../context/UserContext', () => ({
  useUser: () => ({
    id: '23',
    authoredKnots: ['789'],
  }),
  useUserAnon: () => mockUseUserAnon(),
}));

jest.mock('../../utils/firebase', () => ({
  getKnot: async (knotId: string) => {
    mockGetKnot(knotId);
    return {
      content: 'test content',
      author: { username: 'test user', id: '000' },
      associatedString: '999',
    };
  },
  deleteKnot: async ({
    knotId,
    stringId,
  }: {
    knotId: string;
    stringId: string;
  }) => {
    mockDeleteKnot({ knotId, stringId });
  },
}));

describe('tests Knot component', () => {
  it('renders Loading component, then unmounts it', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="1" />);

    await waitFor(() =>
      expect(
        screen.queryByRole('heading', { name: 'Loading component rendered' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('renders knot content', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="443" />);
    const contentText = await screen.findByText('test content');

    expect(contentText).toBeInTheDocument();
  });

  it('invokes firebase.getKnot method with correct argument', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="23" />);

    await waitFor(() => expect(mockGetKnot).toBeCalledWith('23'));
  });

  it('does not render delete button when current user is not author', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="7839" />);

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Delete' }),
      ).not.toBeInTheDocument();
    });
  });

  it('does not render author text when current user is anon', async () => {
    mockUseUserAnon.mockImplementation(() => true);
    render(<Knot knotId="789" />);

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Delete' }),
      ).not.toBeInTheDocument();
    });
  });

  it('renders delete button when current user is author', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="789" />);
    const deleteButton = await screen.findByRole('button', { name: 'Delete' });

    expect(deleteButton).toBeInTheDocument();
  });

  it('invokes firebase.deleteKnot method with correct arguments when delete button clicks', async () => {
    mockUseUserAnon.mockImplementation(() => false);
    render(<Knot knotId="789" />);
    const deleteButton = await screen.findByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteKnot).toBeCalledWith({
        knotId: '789',
        stringId: '999',
      });
    });
  });
});
