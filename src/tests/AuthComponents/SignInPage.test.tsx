import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from '../../components/AuthComponents/SignInPage';

jest.mock(
  '../../components/AuthComponents/SignInForm',
  () =>
    function SignInFormMock() {
      return <h2>SignInForm component rendered</h2>;
    },
);

const mockUpdateStateUponSignIn = jest.fn();

jest.mock('../../utils/firebase', () => ({
  updateStateUponSignIn: (stateFunction: any) => (stateValue: boolean) =>
    mockUpdateStateUponSignIn(stateFunction, stateValue),
}));

describe('tests SignInPage component', () => {
  it('renders SignInForm component upon initial render', () => {
    mockUpdateStateUponSignIn.mockImplementationOnce(() => {});
    render(<SignInPage />);

    const renderText = screen.getByRole('heading', {
      name: 'SignInForm component rendered',
    });
    expect(renderText).toBeInTheDocument();
  });

  it('renders already signed in when user signs in', async () => {
    mockUpdateStateUponSignIn.mockImplementationOnce(
      (stateFunction, stateValue) => {
        stateFunction(stateValue);
      },
    );
    render(<SignInPage />);

    const heading = await screen.findByRole('heading', {
      name: 'Already signed in',
    });

    expect(heading).toBeInTheDocument();
  });
});
