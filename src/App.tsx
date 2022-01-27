import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return <div>signed in</div>;
};

export default App;
