import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { mapDefaults } from '../constants/options';
import FilteringContext from './filtering';

const MapContext = createContext({});

/**
 * The MapProvider is a context to provide options to map.
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
  const [mapLoaded, setMapLoaded] = useState(false);
  const {
    values: { ucVisibility, tiVisibility },
  } = useContext(FilteringContext);

  /**
   * Handles the UC's visibility.
   * @param {A boolean with the UC's visibility} visibility
   */
  function handleUcVisibility(visibility) {
    const map = mapRef.current.getMap();

    if (visibility) {
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_fill',
        'fill-opacity',
        0.7
      );
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_line',
        'line-opacity',
        0.9
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0.17);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0.9);
    } else {
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_fill',
        'fill-opacity',
        0
      );
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_line',
        'line-opacity',
        0
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0);
    }
  }

  /**
   * Handles the TI's visibility.
   * @param {A boolean with the TI's visibility} visibility
   */
  function handleTiVisibility(visibility) {
    const map = mapRef.current.getMap();

    if (visibility) {
      map.setPaintProperty(
        'am-minada-requerimentos-TI_fill',
        'fill-opacity',
        0.7
      );
      map.setPaintProperty(
        'am-minada-requerimentos-TI_line',
        'line-opacity',
        0.9
      );
      map.setPaintProperty('am-minada-terras-indigenas', 'fill-opacity', 0.17);
      map.setPaintProperty(
        'am-minada-terras-indigenas_line',
        'line-opacity',
        0.9
      );
    } else {
      map.setPaintProperty(
        'am-minada-requerimentos-TI_fill',
        'fill-opacity',
        0
      );
      map.setPaintProperty(
        'am-minada-requerimentos-TI_line',
        'line-opacity',
        0
      );
      map.setPaintProperty('am-minada-terras-indigenas', 'fill-opacity', 0);
      map.setPaintProperty(
        'am-minada-terras-indigenas_line',
        'line-opacity',
        0
      );
    }
  }

  /**
   * Update the map items visibility.
   */
  useEffect(() => {
    if (mapLoaded) {
      handleUcVisibility(ucVisibility);
      handleTiVisibility(tiVisibility);
    }
  }, [ucVisibility, tiVisibility]);

  return (
    <MapContext.Provider
      value={{
        values: {
          mapRef,
          viewport,
          mapLoaded,
        },
        setters: {
          setViewport,
          setMapLoaded,
        },
        functions: {
          handleUcVisibility,
          handleTiVisibility,
        },
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
