import React, { FC, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserContext';
import StringContainer from './components/Strings/StringContainer';
import BoxContainer from './components/Boxes/BoxContainer';
import Navbar from './components/Navbar';
import firebase from './utils/firebase';

const App: FC = function App() {
  const navigate = useNavigate();
  const isSignedIn = firebase.isUserSignedIn();

  useEffect(() => {
    if (!isSignedIn) navigate('/sign-in');
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <UserProvider>
      <Routes>
        <Route path="*" element={<Navbar />} />
        <Route
          path="box/:boxId/string/:stringId"
          element={<StringContainer />}
        />
        <Route path="box/:boxId" element={<BoxContainer />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
