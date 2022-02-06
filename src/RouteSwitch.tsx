import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import App from './App';

const RouteSwitch: FC = function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
