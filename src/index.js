import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom"
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
console.log(process.env.PUBLIC_URL);
console.log(process.env.REACT_APP_PUBLIC_URL_LOCAL);
console.log(process.env.REACT_APP_PUBLIC_URL_GITHUB);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
