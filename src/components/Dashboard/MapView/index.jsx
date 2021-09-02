import { useTheme } from 'react-jss';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import useStyles from './styles';
import { mapDefaults } from '../../../constants/options';

/**
 * This component encapsulates the map container given by MapBox.
 */
export default function MapView() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [viewport, setViewport] = useState({...mapDefaults.viewport});

  return (
    <div className={classes.wrapper}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/infoamazonia/ckhe037kt07on1aql47yvp2rn"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </div>
  );
}
