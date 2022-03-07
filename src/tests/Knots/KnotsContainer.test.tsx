import React from 'react';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import KnotsContainer from '../../components/Knots/KnotsContainer';

jest.mock(
  '../../components/Profile/Avatar',
  () =>
    function Avatar() {
      return <h2>Avatar component rendered</h2>;
    },
);

jest.mock(
  '../../components/Knots/Knot',
  () =>
    function KnotMock() {
      return <h3>Knot component rendered</h3>;
    },
);

jest.mock(
  '../../components/Knots/KnotCreate',
  () =>
    function KnotCreateMock() {
      return <h3>KnotCreate component rendered</h3>;
    },
);

describe('tests KnotsContainer component', () => {
  it('renders no knots message when string.hasKnots is false', () => {
    const mockString = { hasKnots: false };
    render(<KnotsContainer isUserAnon string={mockString} />);
    const message = screen.getByText('This string has no knots');
    expect(message).toBeInTheDocument();
  });

  it('renders knots corresponding to string.associatedKnots when string.hasKnots is true', () => {
    const mockString = { hasKnots: true, associatedKnots: ['1', '2', '3'] };
    render(<KnotsContainer isUserAnon string={mockString} />);

    const heading = screen.getAllByRole('heading', {
      name: 'Knot component rendered',
    });

    expect(heading).toHaveLength(3);
  });

  it('does not render KnotCreate component when user is anonymous/guest', () => {
    const mockString = { hasKnots: false, associatedKnots: ['1', '2', '3'] };
    render(<KnotsContainer isUserAnon string={mockString} />);

    const heading = screen.queryByRole('heading', {
      name: 'KnotCreate component rendered',
    });

    expect(heading).not.toBeInTheDocument();
  });

  it('renders KnotCreate component when user is not anonymous/guest', () => {
    const mockString = { hasKnots: false, associatedKnots: ['1', '2', '3'] };
    render(<KnotsContainer isUserAnon={false} string={mockString} />);

    const heading = screen.getByRole('heading', {
      name: 'KnotCreate component rendered',
    });

    expect(heading).toBeInTheDocument();
  });
});
