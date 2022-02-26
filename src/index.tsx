import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from './RouteSwitch';
import './assets/styles/reset.css';
import './assets/styles/normalize.css';
import './assets/styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
