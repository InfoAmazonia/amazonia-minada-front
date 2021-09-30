import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import { embedDefaults } from '../constants/options';
import { useQuery } from '../hooks/useQuery';

const EmbeddingContext = createContext({});

/**
 * The EmbeddingProvider is a context to provide the dashboard filtering options.
 * */
export function EmbeddingProvider({ children }) {
  EmbeddingProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [isZoomEnabled, setIsZoomEnabled] = useState(embedDefaults.zoomEnabled);
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(
    embedDefaults.navigationEnabled
  );
  const [isNorthEnabled, setIsNorthEnabled] = useState(
    embedDefaults.northEnabled
  );
  const [isPanelEnabled, setIsPanelEnabled] = useState(
    embedDefaults.panelEnabled
  );
  const [isShapeActivationEnabled, setIsShapeActivationEnabled] = useState(
    embedDefaults.visibilityButtonsEnabled
  );
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(
    embedDefaults.shareButtonEnabled
  );
  const [legendOpenByDefault, setLegendOpenByDefault] = useState(
    embedDefaults.legendOpenByDefault
  );
  const [isLegendEnabled, setIsLegendEnabled] = useState(
    embedDefaults.legendEnabled
  );
  const [isSearchEnabled, setIsSearchEnabled] = useState(
    embedDefaults.searchEnabled
  );
  const query = useQuery();

  /**
   * This useEffect loads the filtering provider with the query search params.
   */
  useEffect(() => {
    const zoomParam = query.get('zoomEnabled');
    const navigationParam = query.get('navigationEnabled');
    const northEnabled = query.get('northEnabled');
    const panelEnabled = query.get('panelEnabled');
    const shapeActivationEnabled = query.get('shapeActivationEnabled');
    const shareEnabled = query.get('shareEnabled');
    const legendOpen = query.get('legendOpen');
    const legendEnabled = query.get('legendEnabled');
    const searchEnabled = query.get('searchEnabled');

    /**
     * Loads the zoom's activation.
     */
    if (zoomParam && (zoomParam === 'true' || zoomParam === 'false')) {
      setIsZoomEnabled(zoomParam === 'true');
    }

    /**
     * Loads the navigation's activation.
     */
    if (
      navigationParam &&
      (navigationParam === 'true' || navigationParam === 'false')
    ) {
      setIsNavigationEnabled(navigationParam === 'true');
    }

    /**
     * Loads the north's activation.
     */
    if (northEnabled && (northEnabled === 'true' || northEnabled === 'false')) {
      setIsNorthEnabled(northEnabled === 'true');
    }

    /**
     * Loads the panels's activation.
     */
    if (panelEnabled && (panelEnabled === 'true' || panelEnabled === 'false')) {
      setIsPanelEnabled(panelEnabled === 'true');
    }

    /**
     * Loads the shapeActivation's activation.
     */
    if (
      shapeActivationEnabled &&
      (shapeActivationEnabled === 'true' || shapeActivationEnabled === 'false')
    ) {
      setIsShapeActivationEnabled(shapeActivationEnabled === 'true');
    }

    /**
     * Loads the share's activation.
     */
    if (shareEnabled && (shareEnabled === 'true' || shareEnabled === 'false')) {
      setIsShareButtonEnabled(shareEnabled === 'true');
    }

    /**
     * Loads the legend's default opening.
     */
    if (legendOpen && (legendOpen === 'true' || legendOpen === 'false')) {
      setLegendOpenByDefault(legendOpen === 'true');
    }

    /**
     * Loads the legend's activation.
     */
    if (
      legendEnabled &&
      (legendEnabled === 'true' || legendEnabled === 'false')
    ) {
      setIsLegendEnabled(legendEnabled === 'true');
    }

    /**
     * Loads the search's activation.
     */
    if (
      searchEnabled &&
      (searchEnabled === 'true' || searchEnabled === 'false')
    ) {
      setIsSearchEnabled(searchEnabled === 'true');
    }
  }, []);

  return (
    <EmbeddingContext.Provider
      value={{
        values: {
          isZoomEnabled,
          isNavigationEnabled,
          isNorthEnabled,
          isPanelEnabled,
          isShapeActivationEnabled,
          isShareButtonEnabled,
          legendOpenByDefault,
          isLegendEnabled,
          isSearchEnabled,
        },
        setters: {
          setIsZoomEnabled,
          setIsNavigationEnabled,
          setIsNorthEnabled,
          setIsPanelEnabled,
          setIsShapeActivationEnabled,
          setIsShareButtonEnabled,
          setLegendOpenByDefault,
          setIsLegendEnabled,
          setIsSearchEnabled,
        },
        functions: {},
        loaders: {},
      }}
    >
      {children}
    </EmbeddingContext.Provider>
  );
}

export default EmbeddingContext;
