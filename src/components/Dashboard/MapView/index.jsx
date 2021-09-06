import PropTypes from 'prop-types';
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
export default function MapView({ children, navigationButtonsEnabled }) {
  MapView.defaultProps = {
    children: undefined,
    navigationButtonsEnabled: true,
  };

  MapView.propTypes = {
    children: PropTypes.shape(),
    navigationButtonsEnabled: PropTypes.bool,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });
  const { mapRef, viewport, setViewport } = useContext(MapContext);

  function onLoaded() {
    const map = mapRef.current.getMap();
    console.log(map.getStyle());
    console.log(map.getLayer('am-minada-requerimentos_UCs_fill'));
    map.setPaintProperty('am-minada-requerimentos_UCs_fill', 'fill-opacity', 0);
    map.setPaintProperty('am-minada-requerimentos_UCs_line', 'line-opacity', 0);
    map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0);
    map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0);
  }

  return (
    <div className={classes.wrapper}>
      {navigationButtonsEnabled && (
        <div className={classes.navigation}>
          <North />
          <Zoom />
        </div>
      )}
      {children && <div className={classes.options}>{children}</div>}
      <MapGL
        {...viewport}
        onLoad={() => onLoaded()}
        ref={mapRef}
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
