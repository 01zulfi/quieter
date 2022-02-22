import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';
import StyledLink from '../StyledLink';
import { useSetTheme } from '../../context/SetThemeContext';
import image from '../../images/johanna-buguet-5d5H42WDT4M-unsplash.jpg';
import theme from '../../utils/themes';
import lightTheme from '../../icons/light_mode_white_24dp.svg';
import darkTheme from '../../icons/dark_mode_black_24dp.svg';
import StrippedNavbar from '../Navbar/StrippedNavbar';

const SignInPageWrapper = styled.section`
  display: flex;
  justify-center: flex;
  min-height: inherit;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.section`
  background-image: url(${image});
  width: 35%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 680px) {
    display: none;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 4rem;
  margin-top: 4rem;
`;

const H1Wrapper = styled.h1`
  font-size: 3rem;
  text-decoration: underline;
  color: ${(props: any) => props.theme.text.one};
`;
const H2Wrapper = styled.h2`
  font-size: 2em;
  color: ${(props: any) => props.theme.text.one};
`;

const Credits = styled.div`
  margin: auto 0 0;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.85em;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Icon = styled.button`
  background: transparent;
  border: 0;
  margin-right: 1em;
  align-self: center;
  padding: 5px;
  border-radius: 2px;
  position: fixed;
  right: 2em;
  top: 1em;

  &:hover {
    background: ${(props: any) => props.theme.base.four};
  }

  @media (max-width: 680px) {
    display: none;
  }
`;

const NavbarResponsiveWrapper = styled.div`
  display: none;
  @media (max-width: 680px) {
    display: block;
  }
`;

const SignedInWrapper = styled.div`
  margin-top: 2em;
  @media (min-width: 680px) {
    margin-top: 4em;
  }
`;

const SignInPage: FC = function SignInPage() {
  const currentTheme = useTheme();
  const setCurrentTheme = useSetTheme();
  const isUserSignedIn = localStorage.getItem('isSignedIn') === 'true';

  const switchTheme = () => {
    if (currentTheme.name === 'light') {
      setCurrentTheme(theme.dark);
      return;
    }
    setCurrentTheme(theme.light);
  };

  return (
    <SignInPageWrapper>
      <NavbarResponsiveWrapper>
        <StrippedNavbar />
      </NavbarResponsiveWrapper>

      <ImageContainer>
        <HeadingWrapper>
          <H1Wrapper>Q</H1Wrapper>
          <H2Wrapper>uieter</H2Wrapper>
        </HeadingWrapper>

        <Credits>
          <LinkWrapper>
            Photo by
            <StyledLink bold="normal" size="1em">
              <a href="https://unsplash.com/@johannabuguet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                {' '}
                Johanna Buguet
              </a>
            </StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            on
            <StyledLink bold="normal" size="1em">
              <a href="https://unsplash.com/s/photos/misty-mountain?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                {' '}
                Unsplash
              </a>
            </StyledLink>
          </LinkWrapper>
        </Credits>
      </ImageContainer>

      <Wrapper>
        <Icon onClick={switchTheme}>
          <img
            src={currentTheme.name === 'light' ? darkTheme : lightTheme}
            alt="theme"
          />
        </Icon>

        {isUserSignedIn ? (
          <SignedInWrapper>
            <h2>You&apos;re signed in!</h2>
            <StyledLink size="1.5em" bold="500">
              <Link to="/home">Go to homepage</Link>
            </StyledLink>
          </SignedInWrapper>
        ) : (
          <SignInForm />
        )}
      </Wrapper>
    </SignInPageWrapper>
  );
};

export default SignInPage;
