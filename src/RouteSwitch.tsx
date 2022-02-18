import React, { FC, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import SignInPage from './components/AuthComponents/SignInPage';
import SignOutPage from './components/AuthComponents/SignOutPage';
import SetThemeContext from './context/SetThemeContext';
import theme from './utils/themes';
import App from './App';

const AppWrapper = styled.section`
  background: ${(props: any) => props.theme.base.one};
  color: ${(props: any) => props.theme.text.one};
`;

const RouteSwitch: FC = function RouteSwitch() {
  const [currentTheme, setCurrentTheme] = useState<any>(theme.light);

  return (
    <ThemeProvider theme={currentTheme}>
      <SetThemeContext.Provider value={setCurrentTheme}>
        <AppWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-out" element={<SignOutPage />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </AppWrapper>
      </SetThemeContext.Provider>
    </ThemeProvider>
  );
};

export default RouteSwitch;
