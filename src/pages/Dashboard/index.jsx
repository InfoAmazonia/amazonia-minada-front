import React from 'react';
import InfoBar from './Content/InfoBar';
import Map from './Content/MapView';
import useStyles from './styles';

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <InfoBar />
      <div className={classes.mapWrapper}>
        <Map />
      </div>
    </div>
  );
}
