import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise'; 

import reducers from './Reducers';
import Routes from "./Routes";
import "./Styles/css/index.css";

const store = applyMiddleware(ReduxPromise)(createStore)(reducers);

ReactDOM.render(
  <Provider store={store} >
  <Routes />
  </Provider>, document.getElementById("root")
);
