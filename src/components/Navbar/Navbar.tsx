import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useSetTheme } from '../../context/SetThemeContext';
import theme from '../../utils/themes';
import menuLight from '../../assets/icons/menu_white_24dp.svg';
import menuDark from '../../assets/icons/menu_black_24dp.svg';
import cancelLight from '../../assets/icons/cancel_white_24dp.svg';
import StyledLink from '../StyledLink';
import cancelDark from '../../assets/icons/cancel_black_24dp.svg';
import lightTheme from '../../assets/icons/light_mode_white_24dp.svg';
import darkTheme from '../../assets/icons/dark_mode_black_24dp.svg';
import setBodyBackground from '../../utils/set-body-background';
import { setThemeNameInLocalStorage } from '../../utils/theme-local-storage';
import { useUser, useUserAnon } from '../../context/UserContext';
import Avatar from '../Profile/Avatar';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.background};
  height: 4rem;
  position: sticky;
  top: 0;
  z-index: 20;
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 1em;

  &:hover {
    cursor: pointer;
  }
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
  right: 1.8em;
  top: 0.7em;
  z-index: 999;

  @media only screen and (min-width: 680px) {
    display: none;
  }
`;

const Icon2 = styled.button`
  background: transparent;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0.2em;

  &:hover {
    background: ${(props: any) => props.theme.base.four};
    cursor: pointer;
  }
`;

const Navbar: FC = function Navbar() {
  const currentTheme = useTheme();
  const setCurrentTheme = useSetTheme();
  const [showMenu, setShowMenu] = useState(screen.width > 680);
  const navigate = useNavigate();
  const user = useUser();
  const isUserAnon = useUserAnon();

  const switchTheme = () => {
    if (currentTheme.name === 'light') {
      setThemeNameInLocalStorage('dark');
      setCurrentTheme(theme.dark);
      setBodyBackground(theme.dark.base.one);
      return;
    }
    setThemeNameInLocalStorage('light');
    setCurrentTheme(theme.light);
    setBodyBackground(theme.light.base.one);
  };

  const onMenuToggle = () => setShowMenu((prev) => !prev);
  const navigateToHome = () => {
    navigate('/');
  };

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
      <HeadingWrapper onClick={navigateToHome}>
        <H1Wrapper>Q</H1Wrapper>
        <H2Wrapper>uieter</H2Wrapper>
      </HeadingWrapper>

      <Icon onClick={onMenuToggle}>
        <img src={iconDecider()} alt="hamburger" style={{ width: '2.5em' }} />
      </Icon>

      <NavWrapper shouldShow={showMenu}>
        <List>
          <ListItem>
            <Link to="/about">About</Link>
          </ListItem>
          <ListItem>
            <Link to="/explore">Explore</Link>
          </ListItem>
          <ListItem>
            <Link to="/home">Home</Link>
          </ListItem>
          {!isUserAnon && (
            <ListItem>
              <Link to={`/profile/${user.id}`}>
                <Avatar userId={user.id} height="2em" />
              </Link>
            </ListItem>
          )}
          <ListItem>
            <Icon2 onClick={switchTheme}>
              <img
                src={currentTheme.name === 'light' ? darkTheme : lightTheme}
                alt="theme"
              />
            </Icon2>
          </ListItem>
          <ListItem>
            <StyledLink size="1em" bold="650">
              <Link to="/sign-out">Sign out</Link>
            </StyledLink>
          </ListItem>
        </List>
      </NavWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
