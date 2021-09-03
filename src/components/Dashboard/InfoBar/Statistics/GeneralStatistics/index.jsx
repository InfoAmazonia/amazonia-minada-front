import { Typography } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

export default function GeneralStatistics() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper}>
      <div className={classes.statisticItems}>
        <div className={classes.statisticItem}>
          <Typography
            style={{ color: theme.text.primary, fontSize: 16, fontWeight: 700 }}
            variant="h6"
          >
            43
          </Typography>
          <Typography style={{ color: theme.text.tertiary }} variant="caption">
            Requerimentos ilegais
          </Typography>
        </div>
        <div className={classes.statisticItem}>
          <Typography
            style={{ color: theme.text.primary, fontSize: 16, fontWeight: 700 }}
            variant="h6"
          >
            124.141,243 ha
          </Typography>
          <Typography style={{ color: theme.text.tertiary }} variant="caption">
            Área total requerida
          </Typography>
        </div>
      </div>
    </div>
  );
}
