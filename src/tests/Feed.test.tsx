import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feed from '../components/Feed';

jest.mock('../context/UserContext', () => ({
  useUser: () => ({
    associatedStrings: ['1e1', '22'],
  }),
}));

jest.mock(
  '../components/Strings/StringCompactView',
  () =>
    function StringCompactView({ stringId }: { stringId: string }) {
      return <h2>{stringId}</h2>;
    },
);

describe('tests Feed component', () => {
  test('renders same number of StringCompactView as associated strings', () => {
    const { getAllByRole } = render(<Feed />);
    const headings = getAllByRole('heading');

    expect(headings).toHaveLength(2);
  });

  test('passes correct props to StringCompactView', () => {
    const { getAllByRole } = render(<Feed />);
    const headingOne = getAllByRole('heading')[0];
    const headingTwo = getAllByRole('heading')[1];

    expect(headingOne).toHaveTextContent('1e1');
    expect(headingTwo).toHaveTextContent('22');
  });
});
