import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Callback from "./Callback";
import Auth from "./auth";
import LandingPage from "./LandingPage";
import openSocket from 'socket.io-client';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes = () => {
  var socket = openSocket('http://localhost:5000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  return (
    <BrowserRouter>
      <div>
        <Route
          path="/"
          exact
          render={props => <LandingPage auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
