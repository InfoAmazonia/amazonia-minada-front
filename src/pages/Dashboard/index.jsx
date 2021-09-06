import React from 'react';

import Map from '../../components/Dashboard/MapView';
import { MapProvider } from '../../contexts/mapping';
import InfoBar from './InfoBar';
import useStyles from './styles';

/**
 *  This page provides the main wrapper for aplication.
 */
export default function Dashboard() {
  const classes = useStyles();

  return (
    <MapProvider>
      <div className={classes.wrapper}>
        <InfoBar />
        <div className={classes.mapWrapper}>
          <Map />
        </div>
      </div>
    </MapProvider>
  );
}
