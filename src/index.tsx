import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from './RouteSwitch';
import './styles/reset.css';
import './styles/normalize.css';
import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
