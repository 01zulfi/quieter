import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserContext';
import StringPage from './components/Strings/StringPage';
import SignInPrompt from './components/AuthComponents/SignInPrompt';
import BoxPage from './components/Boxes/BoxPage';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';

const App: FC = function App() {
  const isUserSignedIn = localStorage.getItem('isSignedIn') === 'true';

  if (!isUserSignedIn) return <SignInPrompt />;

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="*" element={<Navbar />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/box/:boxId/string/:stringId" element={<StringPage />} />
          <Route path="/box/:boxId" element={<BoxPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
