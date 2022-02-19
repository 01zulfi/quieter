import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { useSetTheme } from '../../context/SetThemeContext';
import theme from '../../utils/themes';
import lightTheme from '../../icons/light_mode_white_24dp.svg';
import darkTheme from '../../icons/dark_mode_black_24dp.svg';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.background};
  height: 5rem;
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 1em;
`;

const H1Wrapper = styled.h1`
  font-size: 4rem;
  text-decoration: underline;
  color: ${(props: any) => props.theme.text.one};
`;
const H2Wrapper = styled.h2`
  font-size: 3em;
  color: ${(props: any) => props.theme.text.one};
`;

const Icon = styled.button`
  background: transparent;
  border: 0;
  margin-right: 3em;
`;

const StrippedNavbar: FC = function StrippedNavbar() {
  const currentTheme = useTheme();
  const setCurrentTheme = useSetTheme();

  const switchTheme = () => {
    if (currentTheme.name === 'light') {
      setCurrentTheme(theme.dark);
      return;
    }
    setCurrentTheme(theme.light);
  };

  return (
    <NavbarWrapper
      background={
        currentTheme.name === 'light' ? 'white' : currentTheme.base.one
      }
    >
      <HeadingWrapper>
        <H1Wrapper>Q</H1Wrapper>
        <H2Wrapper>uieter</H2Wrapper>
      </HeadingWrapper>

      <Icon onClick={switchTheme}>
        <img
          src={currentTheme.name === 'light' ? darkTheme : lightTheme}
          alt="theme"
        />
      </Icon>
    </NavbarWrapper>
  );
};

export default StrippedNavbar;
