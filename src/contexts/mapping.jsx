import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { mapDefaults } from '../constants/options';
import api from '../services/api';
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
    values: { ucVisibility, tiVisibility, searchValue },
  } = useContext(FilteringContext);

  /**
   * Handles the UC's visibility.
   * @param {A boolean with the UC's visibility} visibility
   */
  function handleUcVisibility(visibility) {
    const map = mapRef.current.getMap();

    if (visibility) {
      map.setPaintProperty(
        'ucs-integral-amzlegal-centroi-avgeyq',
        'text-opacity',
        1
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0.17);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0.9);

      if (map.getLayer('unity-requeriments-layer')) {
        map.setPaintProperty('unity-requeriments-layer', 'fill-opacity', 0.7);
      }
    } else {
      map.setPaintProperty(
        'ucs-integral-amzlegal-centroi-avgeyq',
        'text-opacity',
        0
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0);

      if (map.getLayer('unity-requeriments-layer')) {
        map.setPaintProperty('unity-requeriments-layer', 'fill-opacity', 0);
      }
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
        'terras-indigenas-centroides-6hg7p6',
        'text-opacity',
        1
      );
      map.setPaintProperty('am-minada-terras-indigenas', 'fill-opacity', 0.17);
      map.setPaintProperty(
        'am-minada-terras-indigenas_line',
        'line-opacity',
        0.9
      );

      if (map.getLayer('reserve-requeriments-layer')) {
        map.setPaintProperty('reserve-requeriments-layer', 'fill-opacity', 0.7);
      }
    } else {
      map.setPaintProperty(
        'terras-indigenas-centroides-6hg7p6',
        'text-opacity',
        0
      );
      map.setPaintProperty('am-minada-terras-indigenas', 'fill-opacity', 0);
      map.setPaintProperty(
        'am-minada-terras-indigenas_line',
        'line-opacity',
        0
      );

      if (map.getLayer('reserve-requeriments-layer')) {
        map.setPaintProperty('reserve-requeriments-layer', 'fill-opacity', 0);
      }
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
  }, [ucVisibility, tiVisibility, mapLoaded]);

  /**
   * Update the map items visibility.
   */
  useEffect(() => {
    let isSubscribed = true;

    if (mapLoaded) {
      api
        .post('invasions/shape', {
          filters: searchValue,
          enableUnity: true,
          enableReserve: true,
        })
        .then(({ data: { reserve, unity } }) => {
          if (isSubscribed) {
            const map = mapRef.current.getMap();

            if (map.getLayer('reserve-requeriments-layer')) {
              map.removeLayer('reserve-requeriments-layer');
            }

            if (map.getSource('reserve-requeriments-source')) {
              map.removeSource('reserve-requeriments-source');
            }

            map.addSource('reserve-requeriments-source', {
              type: 'geojson',
              data: reserve,
            });

            map.addLayer({
              id: 'reserve-requeriments-layer',
              source: 'reserve-requeriments-source',
              type: 'fill',
              paint: {
                'fill-color': 'red',
                'fill-opacity': tiVisibility ? 0.7 : 0,
              },
            });

            if (map.getLayer('unity-requeriments-layer')) {
              map.removeLayer('unity-requeriments-layer');
            }

            if (map.getSource('unity-requeriments-source')) {
              map.removeSource('unity-requeriments-source');
            }

            map.addSource('unity-requeriments-source', {
              type: 'geojson',
              data: unity,
            });

            map.addLayer({
              id: 'unity-requeriments-layer',
              source: 'unity-requeriments-source',
              type: 'fill',
              paint: {
                'fill-color': 'blue',
                'fill-opacity': ucVisibility ? 0.7 : 0,
              },
            });
          }
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, mapLoaded]);

  /**
   * Fired when the map style is loaded.
   */
  function onMapLoad() {
    handleUcVisibility(ucVisibility);
    handleTiVisibility(tiVisibility);
  }

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
          onMapLoad,
        },
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
