import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import StringCompactView from '../../components/Strings/StringCompactView';

jest.mock(
  '../../components/Loading',
  () =>
    function LoadingMock() {
      return <h2>Loading component rendered</h2>;
    },
);

jest.mock(
  '../../components/Strings/String',
  () =>
    function StringMock() {
      return <h2>String component rendered</h2>;
    },
);

jest.mock(
  '../../components/Knots/Knot',
  () =>
    function KnotMock({ knotId }: { knotId: string }) {
      return <h2>{knotId}</h2>;
    },
);

const mockGetString = jest.fn();

jest.mock('../../utils/firebase', () => ({
  getString: async (stringId: string) => {
    mockGetString(stringId);
    return { latestTwoKnots: ['first knot', 'second knot'] };
  },
}));

describe('tests StringCompactView', () => {
  it('renders Loading component upon first load, then unmounts it', async () => {
    render(<StringCompactView stringId="" />);
    await waitFor(() =>
      expect(
        screen.queryByText('Loading component rendered'),
      ).not.toBeInTheDocument(),
    );
  });

  it('invokes firebase.getString method with correct argument', async () => {
    render(<StringCompactView stringId="223e4" />);

    await waitFor(() => expect(mockGetString).toHaveBeenCalledWith('223e4'));
  });

  it('renders String component', async () => {
    render(<StringCompactView stringId="" />);
    const renderText = await screen.findByRole('heading', {
      name: 'String component rendered',
    });

    expect(renderText).toBeInTheDocument();
  });

  it('renders Knot component according to latestTwoKnots array data', async () => {
    render(<StringCompactView stringId="" />);
    const firstKnot = await screen.findByRole('heading', {
      name: 'first knot',
    });
    const secondKnot = await screen.findByRole('heading', {
      name: 'second knot',
    });

    expect(firstKnot).toBeInTheDocument();
    expect(secondKnot).toBeInTheDocument();
  });
});
