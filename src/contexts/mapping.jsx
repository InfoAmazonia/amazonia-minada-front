import PropTypes from 'prop-types';
import React, { createContext, useRef, useState } from 'react';

import { mapDefaults } from '../constants/options';

const MapContext = createContext({});

/**
 * The MapProvider is context to provide options to map.
 * */
export function MapProvider({ children }) {
  MapProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const mapRef = useRef();
  const [viewport, setViewport] = useState({ ...mapDefaults.viewport });

  return (
    <MapContext.Provider
      value={{
        mapRef,
        viewport,
        setViewport,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
