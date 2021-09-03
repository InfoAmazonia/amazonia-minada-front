import { MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';

import { lightScheme, darkScheme } from '../constants/schemes';

const ThemeContext = createContext({});

/**
 * The ThemeProvider is a wrapper to JssThemeProvider that allows switch themes.
 * */
export function ThemeProvider({ children }) {
  ThemeProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [selectedTheme, setSelectedTheme] = useState(lightScheme);

  /**
   * Load last selected theme or the prefered color scheme.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('@minada/lastTheme');

    if (savedTheme) {
      setSelectedTheme(savedTheme === 'light' ? lightScheme : darkScheme);
    } else {
      setSelectedTheme(prefersDarkMode ? darkScheme : lightScheme);
    }
  }, [prefersDarkMode]);

  /**
   * Switch the theme mode between light, dark or an auto value based on css prefers-color-scheme.
   */
  function switchTheme(themingMode) {
    if (themingMode === 'light' || themingMode === 'dark') {
      setSelectedTheme(themingMode === 'light' ? lightScheme : darkScheme);
      localStorage.setItem('@minada/lastTheme', themingMode);
    } else {
      setSelectedTheme(prefersDarkMode ? darkScheme : lightScheme);
      localStorage.removeItem('@minada/lastTheme');
    }
  }

  /**
   * Generate a theme to be used on Material-ui components.
   */
  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Roboto", "Poppins", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: 12,
          lineHeight: '16.93px',
          letterSpacing: '-0.00833em',
        },
        palette: {
          background: {
            default: selectedTheme.background.primary,
          },
          primary: {
            main: selectedTheme.primary,
          },
          secondary: {
            main: selectedTheme.secondary,
          },
          text: {
            primary: selectedTheme.text.primary,
            secondary: selectedTheme.text.secondary,
          },
        },
      }),
    [selectedTheme]
  );

  return (
    <ThemeContext.Provider value={{ selectedTheme, switchTheme }}>
      <JssThemeProvider theme={selectedTheme}>
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </JssThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
