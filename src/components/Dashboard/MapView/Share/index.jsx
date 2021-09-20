import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component encapsulates the share button.
 */
export default function Share() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <ShareRoundedIcon />
      <div
        style={{ color: theme.text.primary, fontSize: 12, fontWeight: 500 }}
        className={classes.n}
      />
    </div>
  );
}
