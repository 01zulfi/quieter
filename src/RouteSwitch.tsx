import React, { FC, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SignInPage from './components/AuthComponents/SignInPage';
import SignOutPage from './components/AuthComponents/SignOutPage';
import SetThemeContext from './context/SetThemeContext';
import theme from './utils/themes';
import App from './App';

const RouteSwitch: FC = function RouteSwitch() {
  const [currentTheme, setCurrentTheme] = useState<any>(theme.light);

  return (
    <ThemeProvider theme={currentTheme}>
      <SetThemeContext.Provider value={setCurrentTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-out" element={<SignOutPage />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </SetThemeContext.Provider>
    </ThemeProvider>
  );
};

export default RouteSwitch;
