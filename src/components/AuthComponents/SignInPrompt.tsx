import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledLink from '../StyledLink';
import StrippedNavbar from '../Navbar/StrippedNavbar';

const SignInPromptWrapper = styled.section`
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

const SignInPrompt: FC = function SignInPrompt() {
  return (
    <SignInPromptWrapper>
      <StrippedNavbar />
      <MessageWrapper>
        <h3>Looks like you&apos;re not signed in...</h3>
        <StyledLink size="2em" bold="800">
          <Link to="sign-in">sign in here</Link>
        </StyledLink>
      </MessageWrapper>
    </SignInPromptWrapper>
  );
};

export default SignInPrompt;
