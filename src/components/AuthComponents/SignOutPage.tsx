import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import StyledLink from '../StyledLink';
import Loading from '../Loading';
import StrippedNavbar from '../Navbar/StrippedNavbar';
import firebase from '../../utils/firebase';

const SignOutPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5em;
  min-height: inherit;
  background: ${(props: any) => props.theme.base.one};
`;

const MessageWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  color: ${(props: any) => props.theme.text.one};
  align-self: center;
  width: 75%;
  height: 10em;
  justify-content: space-around;
  border: 1px solid ${(props: any) => props.theme.frost.one};
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
`;

const SignOutPage: FC = function SignOutPage() {
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    firebase.signOutUser();
    setIsSignedOut(true);
  }, []);

  return (
    <SignOutPageWrapper>
      <StrippedNavbar />
      {isSignedOut ? (
        <MessageWrapper>
          <h3>Successfully signed out of quieter</h3>
          <StyledLink size="2em" bold="800">
            <Link to="/sign-in">Sign in</Link>
          </StyledLink>
        </MessageWrapper>
      ) : (
        <Loading width="35px" />
      )}
    </SignOutPageWrapper>
  );
};

export default SignOutPage;
