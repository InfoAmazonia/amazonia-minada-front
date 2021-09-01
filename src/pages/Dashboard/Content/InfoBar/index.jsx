import React from 'react';
import { useTheme } from 'react-jss';
import useStyles from './styles';

export default function InfoBar() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return <div className={classes.wrapper} />;
}
