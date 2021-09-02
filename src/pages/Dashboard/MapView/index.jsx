/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from 'react-jss';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import useStyles from './styles';

/**
 * This component encapsulates the map container given by MapBox.
 */
export default function MapView() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div className={classes.wrapper}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </div>
  );
}
