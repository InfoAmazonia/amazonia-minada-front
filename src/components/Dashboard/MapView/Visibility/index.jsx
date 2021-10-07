import { Button, Typography, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import FilteringContext from '../../../../contexts/filtering';
import useStyles from './styles';

/**
 * This component encapsulates the visibility buttons.
 */
export default function Visibility() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    values: { ucVisibility, tiVisibility },
    functions: { handleUcVisibility, handleTiVisibility },
  } = useContext(FilteringContext);
  const isSmall = useMediaQuery('@media (max-width: 440px)');
  const isVerySmall = useMediaQuery('@media (max-width: 350px)');

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        onClick={() => {
          handleTiVisibility(!tiVisibility);
        }}
      >
        <Typography
          style={{
            color: tiVisibility
              ? theme.territorialUnits.indigenousLand
              : theme.text.secondary,
            fontWeight: 500,
          }}
        >
          {isVerySmall
            ? t('dashboard.map.visibility.tiAbbrv')
            : t('dashboard.map.visibility.ti')}
        </Typography>
      </Button>
      <span className={classes.separator} />
      <Button
        className={classes.button}
        onClick={() => {
          handleUcVisibility(!ucVisibility);
        }}
      >
        <Typography
          style={{
            color: ucVisibility
              ? theme.territorialUnits.protectedArea
              : theme.text.secondary,
            fontWeight: 500,
          }}
        >
          {isSmall
            ? t('dashboard.map.visibility.ucAbbrv')
            : t('dashboard.map.visibility.uc')}
        </Typography>
      </Button>
    </div>
  );
}
