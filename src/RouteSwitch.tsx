import React, { FC, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';
import SignInPage from './components/AuthComponents/SignInPage';
import SignOutPage from './components/AuthComponents/SignOutPage';
import SetThemeContext from './context/SetThemeContext';
import theme from './utils/themes';
import App from './App';
import { getThemeNameFromLocalStorage } from './utils/theme-local-storage';
import setBodyBackground from './utils/set-body-background';

const AppWrapper = styled.section`
  background: ${(props: any) => props.theme.base.one};
  color: ${(props: any) => props.theme.text.one};

  @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
  font-family: 'Rubik', sans-serif;

  width: 100%;
  min-height: inherit;
`;

const RouteSwitch: FC = function RouteSwitch() {
  const [currentTheme, setCurrentTheme] = useState<any>(
    getThemeNameFromLocalStorage() === 'light' ? theme.light : theme.dark,
  );

  setBodyBackground(currentTheme.base.one);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <ThemeProvider theme={currentTheme}>
          <SetThemeContext.Provider value={setCurrentTheme}>
            <AppWrapper>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-out" element={<SignOutPage />} />
              <Route path="/*" element={<App />} />
              <Route path="*" element={<h2>Nothing here</h2>} />
            </AppWrapper>
          </SetThemeContext.Provider>
        </ThemeProvider>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
