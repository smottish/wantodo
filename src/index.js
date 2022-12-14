import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme.js'
import { ToastProvider } from './ToastProvider.js'
import { ThemeProvider } from 'emotion-theming';
import './index.css'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
