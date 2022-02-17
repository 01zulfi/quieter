import React, { FC } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserContext';
import StringContainer from './components/Strings/StringContainer';
import BoxContainer from './components/Boxes/BoxContainer';
import Profile from './components/Profile/Profile';
import Home from './components/Home';

function SignInPrompt() {
  return (
    <div>
      not signed in
      <Link to="sign-in">sign in here</Link>
    </div>
  );
}

const App: FC = function App() {
  const isUserSignedIn = localStorage.getItem('isSignedIn') === 'true';

  if (!isUserSignedIn) return <SignInPrompt />;

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/box/:boxId/string/:stringId"
            element={<StringContainer />}
          />
          <Route path="/box/:boxId" element={<BoxContainer />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
