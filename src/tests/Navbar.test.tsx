import React from 'react';
import { render, screen } from '../utils/test-utils';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar/Navbar';

jest.mock('../context/UserContext', () => ({
  useUser: () => ({ id: '1' }),
  useUserAnon: () => {},
}));

jest.mock(
  '../components/Profile/Avatar',
  () =>
    function AvatarMock() {
      return <p>Avatar component rendered</p>;
    },
);

jest.mock('react-router-dom', () => ({
  Link: function Link({ to, children }: { to: string; children: any }) {
    return (
      <h2>
        {to}
        {children}
      </h2>
    );
  },
  useNavigate: () => () => {},
}));

describe('tests Navbar component', () => {
  it('renders heading and headline', () => {
    render(<Navbar />);
    const heading = screen.getByRole('heading', { name: 'Q' });
    const headline = screen.getByRole('heading', {
      name: 'uieter',
    });

    expect(heading).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
  });
});
