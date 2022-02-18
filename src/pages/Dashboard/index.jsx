import React from 'react';

import Map from '../../components/Dashboard/MapView';
import Disclaimer from '../../components/Disclaimer';
import { FilteringProvider } from '../../contexts/filtering';
import { MapProvider } from '../../contexts/mapping';
import InfoBar from './InfoBar';
import useStyles from './styles';

/**
 *  This page provides the main wrapper for aplication.
 */
export default function Dashboard() {
  const classes = useStyles();

  return (
    <FilteringProvider>
      <MapProvider>
        <div className={classes.wrapper}>
          <InfoBar />
          <div className={classes.mapWrapper}>
            <Map northEnabled zoomButtonsEnabled visibilityButtonsEnabled />
          </div>
          <Disclaimer />
        </div>
      </MapProvider>
    </FilteringProvider>
  );
}
