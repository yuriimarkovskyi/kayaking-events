import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './App';

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: "Rubik", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: black;
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  a {
    cursor: revert;
    text-decoration: none;
  }
  
  ol, ul, menu {
    list-style: none;
    padding: 0;
  }
  
  img {
    max-width: 100%;
  }
  
  table {
    border-collapse: collapse;
  }
  
  textarea {
    white-space: revert;
  }
  
  :where([hidden]){
    display:none;
  }
  
  :where([contenteditable]){
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
  }
  
  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Global />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
