import React from 'react';

import Map from '../../components/Dashboard/MapView';
import InfoBar from './InfoBar';
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
