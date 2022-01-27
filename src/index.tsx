import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './utils/firebase-config';
import RouteSwitch from './RouteSwitch';

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
