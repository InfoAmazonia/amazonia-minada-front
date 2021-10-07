import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useTheme } from 'react-jss';
import MapGL from 'react-map-gl';

import { breakpoints } from '../../../constants/constraints';
import { embedDefaults, mapDefaults } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
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
  isPanelEnabled,
}) {
  MapView.defaultProps = {
    northEnabled: embedDefaults.northEnabled,
    zoomEnabled: embedDefaults.zoomEnabled,
    visibilityButtonsEnabled: embedDefaults.visibilityButtonsEnabled,
    navigationEnabled: embedDefaults.navigationEnabled,
    shareButtonEnabled: embedDefaults.shareButtonEnabled,
    legendOpenByDefault: embedDefaults.legendOpenByDefault,
    legendEnabled: embedDefaults.legendEnabled,
    isPanelEnabled: embedDefaults.isPanelEnabled,
  };

  MapView.propTypes = {
    northEnabled: PropTypes.bool,
    zoomEnabled: PropTypes.bool,
    visibilityButtonsEnabled: PropTypes.bool,
    navigationEnabled: PropTypes.bool,
    shareButtonEnabled: PropTypes.bool,
    legendOpenByDefault: PropTypes.bool,
    legendEnabled: PropTypes.bool,
    isPanelEnabled: PropTypes.bool,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });
  const {
    values: { mapRef, viewport, shapesLoaded, cursor, popup },
    setters: { setViewport, setMapLoaded, setDrag },
    functions: { onMapLoad, onHandleHover, onClick },
  } = useContext(MapContext);

  const isSmd = useMediaQuery(breakpoints.max.smd);
  const {
    values: { mobileSearchHeight },
  } = useContext(FilteringContext);

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
    <div
      className={isPanelEnabled ? classes.wrapper : classes.wrapperWithoutSm}
    >
      <Loader loading={!shapesLoaded} />
      <div className={classes.legendContainerExpanded}>
        {northEnabled && <North />}
        {zoomEnabled && <Zoom />}
        {legendEnabled && <Legend defaultOpen={legendOpenByDefault} />}
      </div>
      <div
        style={
          isSmd
            ? { top: mobileSearchHeight === 0 ? 15 : mobileSearchHeight + 30 }
            : {}
        }
        className={classes.options}
      >
        {visibilityButtonsEnabled && <Visibility />}
        {shareButtonEnabled && <Share />}
      </div>
      <MapGL
        {...viewport}
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
        getCursor={() => cursor}
        onMouseDown={() => setDrag(true)}
        onMouseUp={() => setDrag(false)}
        onHover={(e) => {
          onHandleHover(e);
        }}
        onLoad={() => {
          onMapLoad();
          setMapLoaded(true);
        }}
        onClick={(e) => {
          onClick(e);
        }}
      >
        {popup}
        <Geodatin />
      </MapGL>
    </div>
  );
}
