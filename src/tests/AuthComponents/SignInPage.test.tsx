import React from 'react';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import SignInPage from '../../components/AuthComponents/SignInPage';

jest.mock(
  '../../components/AuthComponents/SignInForm',
  () =>
    function SignInFormMock() {
      return <h2>SignInForm component rendered</h2>;
    },
);

describe('tests SignInPage component', () => {
  it('renders SignInForm component when user is not signed in', () => {
    render(<SignInPage />);
    const renderText = screen.getByRole('heading', {
      name: 'SignInForm component rendered',
    });
    expect(renderText).toBeInTheDocument();
  });
});
