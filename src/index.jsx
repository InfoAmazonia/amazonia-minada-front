/* eslint-disable camelcase */
import { CssBaseline } from '@mui/material';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import React from 'react';
import ReactDOM from 'react-dom';

import './i18n/config';
import './assets/css/styles.css';
import 'fontsource-roboto';
import { ThemeProvider } from './contexts/theming';
import Routes from './routes';

HC_exporting(Highcharts);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
