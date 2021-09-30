import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Auth0Provider wrapper for setting up configs for Auth0 connection
import { Auth0Provider } from '@auth0/auth0-react';

require('dotenv').config();
//console.log(process.env.REACT_APP_DOMAIN)
//console.log(window.location.origin) // http://localhost:3000

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


