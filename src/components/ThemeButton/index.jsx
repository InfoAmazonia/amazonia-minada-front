/* eslint-disable react/jsx-no-bind */
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import ThemeContext from '../../contexts/theming';
import useStyles from './styles';
import { lightScheme } from '../../constants/schemes';
import SvgDarkMode from '../Icons/DarkMode';
import SvgLightMode from '../Icons/LightMode';

/**
 * This functional component renders a button that allows the platform theme changing.
 * @returns A button that changes the platform theme.
 */
function ThemeButton() {
  const classes = useStyles();
  const { selectedTheme, switchTheme } = useContext(ThemeContext);

  /**
   * This function switch the platform theme between dark or light mode.
   * @param {Click} event
   */
  function handleSwitchTheme() {
    if (selectedTheme === lightScheme) {
      switchTheme('dark');
    } else {
      switchTheme('light');
    }
  }

  return (
    <Button className={classes.button} onClick={handleSwitchTheme}>
      {selectedTheme === lightScheme ? (
        <SvgDarkMode className={classes.darkIcon} />
      ) : (
        <SvgLightMode className={classes.lightIcon} />
      )}
    </Button>
  );
}

export default ThemeButton;
