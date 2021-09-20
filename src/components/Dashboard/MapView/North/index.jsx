import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Typography } from '@mui/material';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component encapsulates the north sign.
 */
export default function North() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <ExpandLessIcon className={classes.upIcon} />
      <Typography
        style={{ color: theme.text.primary, fontSize: 12, fontWeight: 500 }}
        className={classes.n}
      >
        N
      </Typography>
    </div>
  );
}
