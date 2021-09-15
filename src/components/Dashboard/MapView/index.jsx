import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useTheme } from 'react-jss';
import MapGL from 'react-map-gl';

import MapContext from '../../../contexts/mapping';
import Geodatin from './Geodatin';
import Legend from './Legend';
import North from './North';
import useStyles from './styles';
import Visibility from './Visibility';
import Zoom from './Zoom';

/**
 * This component encapsulates the map container given by MapBox.
 */
export default function MapView({
  northEnabled,
  zoomButtonsEnabled,
  visibilityButtonsEnabled,
}) {
  MapView.defaultProps = {
    northEnabled: true,
    zoomButtonsEnabled: true,
    visibilityButtonsEnabled: true,
  };

  MapView.propTypes = {
    northEnabled: PropTypes.bool,
    zoomButtonsEnabled: PropTypes.bool,
    visibilityButtonsEnabled: PropTypes.bool,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });
  const {
    values: { mapRef, viewport },
    setters: { setViewport, setMapLoaded },
    functions: { onMapLoad },
  } = useContext(MapContext);

  return (
    <div className={classes.wrapper}>
      <div className={classes.navigation}>
        {northEnabled && <North />}
        {zoomButtonsEnabled && <Zoom />}
      </div>
      <div className={classes.options}>
        {visibilityButtonsEnabled && <Visibility />}
      </div>
      <div className={classes.legendContainer}>
        <Legend />
      </div>
      <MapGL
        {...viewport}
        onLoad={() => {
          onMapLoad();
          setMapLoaded(true);
        }}
        ref={mapRef}
        width="100%"
        height="100%"
        dragRotate={false}
        mapStyle="mapbox://styles/infoamazonia/ckhe037kt07on1aql47yvp2rn"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Geodatin />
      </MapGL>
    </div>
  );
}
