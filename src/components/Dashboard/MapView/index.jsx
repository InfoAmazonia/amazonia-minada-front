import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useTheme } from 'react-jss';
import MapGL from 'react-map-gl';

import { breakpoints } from '../../../constants/constraints';
import { embedDefaults, mapDefaults } from '../../../constants/options';
import MapContext from '../../../contexts/mapping';
import Geodatin from './Geodatin';
import Legend from './Legend';
import Loader from './Loader';
import North from './North';
import Share from './Share';
import useStyles from './styles';
import Visibility from './Visibility';
import Zoom from './Zoom';

/**
 * This component encapsulates the map container given by MapBox.
 */
export default function MapView({
  northEnabled,
  zoomEnabled,
  navigationEnabled,
  visibilityButtonsEnabled,
  shareButtonEnabled,
  legendOpenByDefault,
  legendEnabled,
}) {
  MapView.defaultProps = {
    northEnabled: embedDefaults.northEnabled,
    zoomEnabled: embedDefaults.zoomEnabled,
    visibilityButtonsEnabled: embedDefaults.visibilityButtonsEnabled,
    navigationEnabled: embedDefaults.navigationEnabled,
    shareButtonEnabled: embedDefaults.shareButtonEnabled,
    legendOpenByDefault: embedDefaults.legendOpenByDefault,
    legendEnabled: embedDefaults.legendEnabled,
  };

  MapView.propTypes = {
    northEnabled: PropTypes.bool,
    zoomEnabled: PropTypes.bool,
    visibilityButtonsEnabled: PropTypes.bool,
    navigationEnabled: PropTypes.bool,
    shareButtonEnabled: PropTypes.bool,
    legendOpenByDefault: PropTypes.bool,
    legendEnabled: PropTypes.bool,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });
  const {
    values: { mapRef, viewport, shapesLoaded },
    setters: { setViewport, setMapLoaded },
    functions: { onMapLoad },
  } = useContext(MapContext);
  const isMd = useMediaQuery(breakpoints.max.md);

  /**
   * This function handles the viewport change according to the max bounds values.
   */
  function onViewportChange(newViewport) {
    if (
      newViewport.longitude < mapDefaults.maxBounds.minLongitude &&
      newViewport.latitude < mapDefaults.maxBounds.minLatitude
    ) {
      newViewport.longitude = mapDefaults.maxBounds.minLongitude;
      newViewport.latitude = mapDefaults.maxBounds.minLatitude;
    } else if (
      newViewport.longitude > mapDefaults.maxBounds.maxLongitude &&
      newViewport.latitude > mapDefaults.maxBounds.maxLatitude
    ) {
      newViewport.longitude = mapDefaults.maxBounds.maxLongitude;
      newViewport.latitude = mapDefaults.maxBounds.maxLatitude;
    } else if (
      newViewport.longitude < mapDefaults.maxBounds.minLongitude &&
      newViewport.latitude > mapDefaults.maxBounds.maxLatitude
    ) {
      newViewport.longitude = mapDefaults.maxBounds.minLongitude;
      newViewport.latitude = mapDefaults.maxBounds.maxLatitude;
    } else if (
      newViewport.longitude > mapDefaults.maxBounds.maxLongitude &&
      newViewport.latitude < mapDefaults.maxBounds.minLatitude
    ) {
      newViewport.longitude = mapDefaults.maxBounds.maxLongitude;
      newViewport.latitude = mapDefaults.maxBounds.minLatitude;
    } else if (newViewport.longitude < mapDefaults.maxBounds.minLongitude) {
      newViewport.longitude = mapDefaults.maxBounds.minLongitude;
    } else if (newViewport.longitude > mapDefaults.maxBounds.maxLongitude) {
      newViewport.longitude = mapDefaults.maxBounds.maxLongitude;
    } else if (newViewport.latitude < mapDefaults.maxBounds.minLatitude) {
      newViewport.latitude = mapDefaults.maxBounds.minLatitude;
    } else if (newViewport.latitude > mapDefaults.maxBounds.maxLatitude) {
      newViewport.latitude = mapDefaults.maxBounds.maxLatitude;
    }

    setViewport(newViewport);
  }

  return (
    <div className={classes.wrapper}>
      <Loader loading={!shapesLoaded} />
      <div className={classes.navigation}>
        {(legendEnabled || isMd) && (
          <>
            {northEnabled && <North />}
            {zoomEnabled && <Zoom />}
          </>
        )}
        <div className={classes.legendContainerContained}>
          {legendEnabled && <Legend defaultOpen={legendOpenByDefault} />}
        </div>
      </div>
      <div className={classes.options}>
        {visibilityButtonsEnabled && <Visibility />}
        {shareButtonEnabled && <Share />}
      </div>
      <div className={classes.legendContainerExpanded}>
        {!legendEnabled && (
          <>
            {northEnabled && <North />}
            {zoomEnabled && <Zoom />}
          </>
        )}
        {legendEnabled && <Legend defaultOpen={legendOpenByDefault} />}
      </div>
      <MapGL
        {...viewport}
        onLoad={() => {
          onMapLoad();
          setMapLoaded(true);
        }}
        doubleClickZoom={zoomEnabled}
        touchZoom={zoomEnabled}
        scrollZoom={zoomEnabled}
        dragPan={navigationEnabled}
        ref={mapRef}
        width="100%"
        height="100%"
        dragRotate={false}
        mapStyle="mapbox://styles/infoamazonia/ckhe037kt07on1aql47yvp2rn"
        onViewportChange={(newViewport) => onViewportChange(newViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Geodatin />
      </MapGL>
    </div>
  );
}
