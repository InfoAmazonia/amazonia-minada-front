import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import 'fontsource-roboto';
import { ThemeProvider } from './contexts/theming';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
