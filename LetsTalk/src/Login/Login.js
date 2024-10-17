import React from 'react';
import './Login.css';
import Logo from './Logo/Logo.js';
import LoginMessage from './LoginMessage/LoginMessage.js';
import LoginForm from './LoginForm/LoginForm.js';
import Bubble from './Bubble/Bubble.js';


function Login({ setCurrentUser, setToken, token }) {
  return (
    <div id="login-body">
      <div className="container-fluid" id="login-screen-container">
        <div className="row login-row">
          <Logo />
        </div>
        <div className="row login-row">
          <div className="col" id="login-col">
              <LoginMessage />
              <LoginForm setCurrentUser={setCurrentUser} setToken={setToken} token={token} />
          </div>
        </div>
      </div>
      <Bubble />
    </div>
  );
}

export default Login;