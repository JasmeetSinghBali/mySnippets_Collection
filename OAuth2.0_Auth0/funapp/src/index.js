import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Auth0Provider wrapper for setting up configs for Auth0 connection
import { Auth0Provider } from '@auth0/auth0-react';

require('dotenv').config();
//console.log(process.env.REACT_APP_DOMAIN)
//console.log(window.location.origin) // http://localhost:3000

//🎇 the audience(unique identifier of resource api) and scopes like openid so that when react make request to Auth0 servers
// it is treated as OpenID connect request i.e O.I.D.C request
// profile to access the profile of the user
// and email to access the email of the user
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_UNIQUE_IDENTIFIER}
    scope="openid profile email" 
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


