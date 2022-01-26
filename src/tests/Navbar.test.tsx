import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

describe('test navbar', () => {
  test('heading and headline renders', () => {
    const { getByRole } = render(<Navbar />);
    const heading = getByRole('heading', { name: 'quieter' });
    const headline = getByRole('heading', {
      name: 'social media for quiet folks',
    });

    expect(heading).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
  });
});
