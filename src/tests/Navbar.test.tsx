import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return (
      <h2>
        {to}
        {children}
      </h2>
    );
  },
}));

describe('tests Navbar component', () => {
  it('renders heading and headline', () => {
    render(<Navbar />);
    const heading = screen.getByRole('heading', { name: 'quieter' });
    const headline = screen.getByRole('heading', {
      name: 'social media for quiet folks',
    });

    expect(heading).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
  });
});
