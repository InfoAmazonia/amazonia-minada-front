import React, { useContext } from 'react';
import { useTheme } from 'react-jss';
import MapGL from 'react-map-gl';

import MapContext from '../../../contexts/mapping';
import Geodatin from './Geodatin';
import North from './North';
import useStyles from './styles';
import Zoom from './Zoom';

/**
 * This component encapsulates the map container given by MapBox.
 */
export default function MapView() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { viewport, setViewport } = useContext(MapContext);

  return (
    <div className={classes.wrapper}>
      <div className={classes.navigation}>
        <North />
        <Zoom />
      </div>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/infoamazonia/ckhe037kt07on1aql47yvp2rn"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Geodatin />
      </MapGL>
    </div>
  );
}
