import React, { useContext } from 'react';

import Map from '../../../components/Dashboard/MapView';
import EmbeddingContext from '../../../contexts/embedding';
import InfoBar from '../../Dashboard/InfoBar';
import useStyles from './styles';

/**
 *  This page provides the main wrapper for the embedding aplication.
 */
export default function EmbeddingWrapper() {
  const classes = useStyles();
  const {
    values: {
      isNorthEnabled,
      isZoomEnabled,
      isNavigationEnabled,
      isPanelEnabled,
      isShapeActivationEnabled,
      isShareButtonEnabled,
      legendOpenByDefault,
      isLegendEnabled,
      isSearchEnabled,
    },
  } = useContext(EmbeddingContext);

  return (
    <div className={classes.wrapper}>
      {isPanelEnabled && <InfoBar searchEnabled={isSearchEnabled} />}
      <div className={classes.mapWrapper}>
        <Map
          northEnabled={isNorthEnabled}
          zoomEnabled={isZoomEnabled}
          navigationEnabled={isNavigationEnabled}
          visibilityButtonsEnabled={isShapeActivationEnabled}
          shareButtonEnabled={isShareButtonEnabled}
          legendOpenByDefault={legendOpenByDefault}
          legendEnabled={isLegendEnabled}
        />
      </div>
    </div>
  );
}
