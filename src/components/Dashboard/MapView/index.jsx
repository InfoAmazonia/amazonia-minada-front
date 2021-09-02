import { useTheme } from 'react-jss';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import useStyles from './styles';
import { mapDefaults } from '../../../constants/options';
import GeodatinLogo from '../../../assets/images/geodatin_map.svg'

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
      >

<a
        href="https://geodatin.com"
        target="blank"
        className={classes.geodatinContainer}
      >
        <img
          src={GeodatinLogo}
          alt="Geodatin Logo"
          className={classes.geodatinLogo}
          unselectable="on"
        />
      </a>
        </MapGL>
    </div>
  );
}
