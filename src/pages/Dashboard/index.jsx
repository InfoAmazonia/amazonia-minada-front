import { Typography } from '@material-ui/core';
import React from 'react';
import ThemeButton from '../../components/ThemeButton';
import useStyles from './styles';

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6">
        Olá Amazônia Minada!
      </Typography>
      <ThemeButton />
    </div>
  );
}
