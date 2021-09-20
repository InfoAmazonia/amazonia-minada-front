import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { Button } from '@mui/material/core';
import React, { useContext } from 'react';

import { lightScheme } from '../../constants/schemes';
import ThemeContext from '../../contexts/theming';
import useStyles from './styles';

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
    <Button className={classes.button} onClick={() => handleSwitchTheme()}>
      {selectedTheme === lightScheme ? (
        <WbSunnyRoundedIcon />
      ) : (
        <Brightness2RoundedIcon />
      )}
    </Button>
  );
}

export default ThemeButton;
