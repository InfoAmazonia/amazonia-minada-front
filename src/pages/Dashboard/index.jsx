import React from 'react';
import InfoBar from './InfoBar';
import Map from '../../components/Dashboard/MapView';
import useStyles from './styles';

/**
 *  This page provides the main wrapper for aplication.
 */
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
