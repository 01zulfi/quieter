import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useSetTheme } from '../context/SetThemeContext';
import theme from '../utils/themes';
import Button from './Button';

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
    <div>
      <div>
        <h1>quieter</h1>
        <h2>social media for quiet folks</h2>
      </div>
      <div>Search Component Placeholder</div>
      <div>Avatar Component Placeholder</div>
      <div>
        <Link to="/sign-out">Sign out</Link>
      </div>
      <Button
        textContent={currentTheme === 'light' ? 'dark' : 'light'}
        type="button"
        clickHandler={switchTheme}
      />
    </div>
  );
};

export default Navbar;
