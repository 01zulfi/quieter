import React, { FC } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserContext';
import StringContainer from './components/Strings/StringContainer';
import BoxContainer from './components/Boxes/BoxContainer';
import Navbar from './components/Navbar';
import Feed from './components/Feed';

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
          <Route path="*" element={<Navbar />} />
          <Route path="/home" element={<Feed />} />
          <Route
            path="/box/:boxId/string/:stringId"
            element={<StringContainer />}
          />
          <Route path="/box/:boxId" element={<BoxContainer />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
