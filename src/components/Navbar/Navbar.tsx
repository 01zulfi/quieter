import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useSetTheme } from '../../context/SetThemeContext';
import theme from '../../utils/themes';
import menuLight from '../../icons/menu_white_24dp.svg';
import menuDark from '../../icons/menu_black_24dp.svg';
import cancelLight from '../../icons/cancel_white_24dp.svg';
import cancelDark from '../../icons/cancel_black_24dp.svg';
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

const NavWrapper = styled.nav`
  display: ${(props: any) => (props.shouldShow ? 'flex' : 'none')};
  align-items: center;
  font-weight: bold;

  @media only screen and (max-width: 680px) {
    background: rgba(255, 255, 255, 0.01);
    font-size: 1.4em;
    position: absolute;
    right: 0;
    height: 100vh;
    width: 80vw;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5em;
    gap: 3em;
    backdrop-filter: blur(1rem);
  }
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  gap: 1em;
  list-style: none;
  align-items: center;
  margin-right: 1em;

  flex-direction: column;

  @media only screen and (min-width: 680px) {
    display: flex;
    flex-direction: row;
  }
`;

const Icon = styled.button`
  background: transparent;
  border: 0;
  position: fixed;
  right: 2em;
  top: 1em;
  z-index: 999;

  @media only screen and (min-width: 680px) {
    display: none;
  }
`;

const Icon2 = styled.button`
  background: transparent;
  border: 0;
`;

const Navbar: FC = function Navbar() {
  const currentTheme = useTheme();
  const setCurrentTheme = useSetTheme();
  const [showMenu, setShowMenu] = useState(screen.width > 680);

  const switchTheme = () => {
    if (currentTheme.name === 'light') {
      setCurrentTheme(theme.dark);
      return;
    }
    setCurrentTheme(theme.light);
  };

  const onMenuToggle = () => setShowMenu((prev) => !prev);

  const iconDecider = () => {
    if (showMenu) {
      if (currentTheme.name === 'light') return cancelDark;
      return cancelLight;
    }
    return currentTheme.name === 'light' ? menuDark : menuLight;
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

      <Icon onClick={onMenuToggle}>
        <img src={iconDecider()} alt="hamburger" style={{ width: '3em' }} />
      </Icon>

      <NavWrapper shouldShow={showMenu}>
        <List>
          <li>About</li>
          <li>Profile</li>
          <li>
            <Icon2 onClick={switchTheme}>
              <img
                src={currentTheme.name === 'light' ? darkTheme : lightTheme}
                alt="theme"
              />
            </Icon2>
          </li>
          <li>
            <Link to="/sign-out">Sign out</Link>
          </li>
        </List>
      </NavWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
