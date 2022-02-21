import React from 'react';
import { screen, render, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringContainer from '../../components/Strings/StringContainer';

jest.mock('react-router-dom', () => ({
  Link: function LinkMock({ to, children }: { to: string; children: any }) {
    return (
      <>
        {to}
        {children}
      </>
    );
  },
  useParams: () => ({ stringId: '012' }),
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

const mockUseUserAnon = jest.fn();

jest.mock('../../context/UserContext', () => ({
  useUser: () => ({ authoredStrings: ['012'] }),
  useUserAnon: () => mockUseUserAnon(),
}));

jest.mock(
  '../../components/Strings/StringAuthorView',
  () =>
    function StringAuthorView() {
      return <h2>StringAuthorView component rendered</h2>;
    },
);

jest.mock(
  '../../components/Strings/String',
  () =>
    function String() {
      return <h3>String component rendered</h3>;
    },
);

jest.mock(
  '../../components/Knots/Knot',
  () =>
    function Knot({ knotId }: { knotId: string }) {
      return <h3>{knotId}</h3>;
    },
);

const mockGetString = jest.fn();

jest.mock(
  '../../components/Knots/KnotCreate',
  () =>
    function KnotCreate() {
      return <h3>KnotCreate component rendered</h3>;
    },
);

jest.mock('../../utils/firebase', () => ({
  getString: async (stringId: string) => {
    mockGetString(stringId);
    return {
      associatedKnots: ['first knot', 'second knot'],
      hasKnots: true,
      associatedBox: { name: 'test box', id: 'hello' },
    };
  },
}));

describe('tests StringContainer component', () => {
  it('renders loading upon initial render, then it disappears', async () => {
    render(<StringContainer />);

    await waitFor(() =>
      expect(screen.queryByText('loading..')).not.toBeInTheDocument(),
    );
  });

  it('invokes firebase.getString with correct argument', async () => {
    render(<StringContainer />);

    await waitFor(() => expect(mockGetString).toHaveBeenCalledWith('012'));
  });

  it('renders box name link', async () => {
    render(<StringContainer />);
    const link = await screen.findByText(/test box/);
    expect(link).toBeInTheDocument();
  });

  it('renders StringAuthorView when user is the author', async () => {
    render(<StringContainer />);

    const renderText = await screen.findByRole('heading', {
      name: 'StringAuthorView component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('renders String component', async () => {
    render(<StringContainer />);

    const renderText = await screen.findByRole('heading', {
      name: 'String component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('renders Knots', async () => {
    render(<StringContainer />);

    const knotOne = await screen.findByRole('heading', { name: 'first knot' });
    const knotTwo = await screen.findByRole('heading', { name: 'second knot' });

    expect(knotOne).toBeInTheDocument();
    expect(knotTwo).toBeInTheDocument();
  });

  it('renders KnotCreate component', async () => {
    render(<StringContainer />);

    const renderText = await screen.findByRole('heading', {
      name: 'KnotCreate component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('does not render StringAuthorView when user is anonymous/guest', async () => {
    mockUseUserAnon.mockImplementation(() => true);
    render(<StringContainer />);

    await waitFor(() =>
      expect(screen.queryByText('StringAuthorView')).not.toBeInTheDocument(),
    );
  });

  it('does not render KnotCreate component when user is anonymous/guest', async () => {
    mockUseUserAnon.mockImplementation(() => true);
    render(<StringContainer />);

    await waitFor(() =>
      expect(
        screen.queryByRole('heading', {
          name: 'KnotCreate component rendered',
        }),
      ).not.toBeInTheDocument(),
    );
  });
});
