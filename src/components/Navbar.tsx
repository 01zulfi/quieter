import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useSetTheme } from '../context/SetThemeContext';
import theme from '../utils/themes';
import Button from './Button';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.one};
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
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  gap: 1em;
  list-style: none;
  align-items: center;
  margin-right: 1em;
`;

const Navbar: FC = function Navbar() {
  const currentTheme = useTheme().name;
  const setCurrentTheme = useSetTheme();

  const switchTheme = () => {
    if (currentTheme === 'light') {
      setCurrentTheme(theme.dark);
      return;
    }
    setCurrentTheme(theme.light);
  };

  return (
    <NavbarWrapper>
      <HeadingWrapper>
        <H1Wrapper>Q</H1Wrapper>
        <H2Wrapper>uieter</H2Wrapper>
      </HeadingWrapper>
      <NavWrapper>
        <List>
          <li>About</li>
          <li>
            <Button
              textContent={currentTheme === 'light' ? 'dark' : 'light'}
              type="button"
              clickHandler={switchTheme}
            />
          </li>
          <li>Profile</li>
          <li>
            <Link to="/sign-out">Sign out</Link>
          </li>
        </List>
      </NavWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
