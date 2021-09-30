import bbox from '@turf/bbox';
import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'react-jss';
import { WebMercatorViewport } from 'react-map-gl';

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
  const [shapesLoaded, setShapesLoaded] = useState(true);
  const {
    values: { ucVisibility, tiVisibility, searchValue },
  } = useContext(FilteringContext);
  const theme = useTheme();

  /**
   * Handles the UC's visibility and opacity.
   * @param {A boolean with the UC's visibility} visibility
   * @param {A boolean enabling if the default shapes will be showed} enableDefaults
   */
  function handleUcVisibility(visibility, enableDefaults) {
    const map = mapRef.current.getMap();

    if (visibility) {
      map.setPaintProperty(
        'ucs-integral-amzlegal-centroi-avgeyq',
        'text-opacity',
        1
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0.17);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0.91);

      if (enableDefaults) {
        map.setPaintProperty(
          'am-minada-requerimentos_UCs_line',
          'line-opacity',
          ['case', ['>=', ['get', 'ANO'], 2019], 0.9, 0.7]
        );
        map.setPaintProperty(
          'am-minada-requerimentos_UCs_fill',
          'fill-opacity',
          ['case', ['>=', ['get', 'ANO'], 2019], 0.7, 0.1]
        );
      }

      if (map.getLayer('unity-requeriments-layer-fill')) {
        map.setPaintProperty('unity-requeriments-layer-fill', 'fill-opacity', [
          'case',
          ['>=', ['get', 'year'], 2019],
          0.7,
          0.1,
        ]);
      }

      if (map.getLayer('unity-requeriments-layer-line')) {
        map.setPaintProperty('unity-requeriments-layer-line', 'line-opacity', [
          'case',
          ['>=', ['get', 'year'], 2019],
          0.9,
          0.7,
        ]);
      }
    } else {
      map.setPaintProperty(
        'ucs-integral-amzlegal-centroi-avgeyq',
        'text-opacity',
        0
      );
      map.setPaintProperty('amzminada_ucs', 'fill-opacity', 0);
      map.setPaintProperty('amzminada_ucs_line', 'line-opacity', 0);
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_line',
        'line-opacity',
        0
      );
      map.setPaintProperty(
        'am-minada-requerimentos_UCs_fill',
        'fill-opacity',
        0
      );

      if (map.getLayer('unity-requeriments-layer-fill')) {
        map.setPaintProperty(
          'unity-requeriments-layer-fill',
          'fill-opacity',
          0
        );
      }

      if (map.getLayer('unity-requeriments-layer-line')) {
        map.setPaintProperty(
          'unity-requeriments-layer-line',
          'line-opacity',
          0
        );
      }
    }
  }

  /**
   * Handles the TI's visibility and opacity.
   * @param {A boolean with the TI's visibility} visibility
   * @param {A boolean enabling if the default shapes will be showed} enableDefaults
   */
  function handleTiVisibility(visibility, enableDefaults) {
    const map = mapRef.current.getMap();

    if (visibility) {
      map.setPaintProperty(
        'terras-indigenas-centroides-6hg7p6',
        'text-opacity',
        1
      );
      map.setPaintProperty('am-minada-terras-indigenas', 'fill-opacity', 0.35);
      map.setPaintProperty(
        'am-minada-terras-indigenas_line',
        'line-opacity',
        0.91
      );

      if (enableDefaults) {
        map.setPaintProperty(
          'am-minada-requerimentos-TI_line',
          'line-opacity',
          ['case', ['>=', ['get', 'ANO'], 2019], 0.9, 0.7]
        );
        map.setPaintProperty(
          'am-minada-requerimentos-TI_fill',
          'fill-opacity',
          ['case', ['>=', ['get', 'ANO'], 2019], 0.7, 0.1]
        );
      }

      if (map.getLayer('reserve-requeriments-layer-fill')) {
        map.setPaintProperty(
          'reserve-requeriments-layer-fill',
          'fill-opacity',
          ['case', ['>=', ['get', 'year'], 2019], 0.7, 0.1]
        );
      }

      if (map.getLayer('reserve-requeriments-layer-line')) {
        map.setPaintProperty(
          'reserve-requeriments-layer-line',
          'line-opacity',
          ['case', ['>=', ['get', 'year'], 2019], 0.9, 0.7]
        );
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
      map.setPaintProperty(
        'am-minada-requerimentos-TI_line',
        'line-opacity',
        0
      );
      map.setPaintProperty(
        'am-minada-requerimentos-TI_fill',
        'fill-opacity',
        0
      );

      if (map.getLayer('reserve-requeriments-layer-fill')) {
        map.setPaintProperty(
          'reserve-requeriments-layer-fill',
          'fill-opacity',
          0
        );
      }

      if (map.getLayer('reserve-requeriments-layer-line')) {
        map.setPaintProperty(
          'reserve-requeriments-layer-line',
          'line-opacity',
          0
        );
      }
    }
  }

  /**
   * This function paints the shapes according to the theme color.
   */
  function paintLayers(themeProp) {
    const map = mapRef.current.getMap();

    if (
      !map.getLayer('reserve-requeriments-layer-fill') &&
      !map.getLayer('reserve-requeriments-layer-line') &&
      !map.getLayer('unity-requeriments-layer-fill') &&
      !map.getLayer('unity-requeriments-layer-line')
    ) {
      return;
    }

    const colorExpression = [
      'match',
      ['get', 'miningProcess'],
      'CONCESSÃO DE LAVRA',
      themeProp.miningProcesses.miningConcession,
      'LAVRA GARIMPEIRA',
      themeProp.miningProcesses.smallScaleMining,
      'REQUERIMENTO DE PESQUISA',
      themeProp.miningProcesses.miningResearchRequest,
      'AUTORIZAÇÃO DE PESQUISA',
      themeProp.miningProcesses.miningResearchAuthorization,
      'REQUERIMENTO DE LAVRA GARIMPEIRA',
      themeProp.miningProcesses.smallScaleMiningRequest,
      'REQUERIMENTO DE LAVRA',
      themeProp.miningProcesses.smallScaleMiningRequest,
      'DIREITO DE REQUERER A LAVRA',
      themeProp.miningProcesses.smallScaleMiningRequest,
      'APTO PARA DISPONIBILIDADE',
      themeProp.miningProcesses.availableMiningArea,
      'DISPONIBILIDADE',
      themeProp.miningProcesses.availableMiningArea,
      'black',
    ];

    map.setPaintProperty(
      'reserve-requeriments-layer-fill',
      'fill-color',
      colorExpression
    );

    map.setPaintProperty(
      'reserve-requeriments-layer-line',
      'line-color',
      colorExpression
    );

    map.setPaintProperty(
      'unity-requeriments-layer-fill',
      'fill-color',
      colorExpression
    );

    map.setPaintProperty(
      'unity-requeriments-layer-line',
      'line-color',
      colorExpression
    );
  }

  /**
   * Update the map items visibility.
   */
  useEffect(() => {
    if (mapLoaded) {
      handleUcVisibility(ucVisibility, Object.keys(searchValue).length === 0);
      handleTiVisibility(tiVisibility, Object.keys(searchValue).length === 0);
    }
  }, [ucVisibility, tiVisibility, mapLoaded, searchValue]);

  /**
   * This function resets the lng e lat values according to initial values.
   */
  function resetLngLat() {
    const vp = new WebMercatorViewport(viewport);

    const { longitude, latitude, zoom } = vp.fitBounds(
      [mapDefaults.bounds.southwestern, mapDefaults.bounds.northeastern],
      {
        padding: 0,
      }
    );

    setViewport((vw) => ({
      ...vw,
      longitude,
      latitude,
      zoom,
    }));
  }

  /**
   * Update the map items visibility.
   */
  useEffect(() => {
    let isSubscribed = true;

    if (mapLoaded) {
      if (Object.keys(searchValue).length > 0) {
        setShapesLoaded(false);

        api
          .post('invasions/shape', {
            filters: searchValue,
            enableUnity: true,
            enableReserve: true,
          })
          .then(({ data: { reserve, unity } }) => {
            setShapesLoaded(true);

            if (isSubscribed) {
              const map = mapRef.current.getMap();

              map.setPaintProperty(
                'am-minada-requerimentos_UCs_line',
                'line-opacity',
                0
              );
              map.setPaintProperty(
                'am-minada-requerimentos_UCs_fill',
                'fill-opacity',
                0
              );
              map.setPaintProperty(
                'am-minada-requerimentos-TI_line',
                'line-opacity',
                0
              );
              map.setPaintProperty(
                'am-minada-requerimentos-TI_fill',
                'fill-opacity',
                0
              );

              if (map.getLayer('reserve-requeriments-layer-fill')) {
                map.removeLayer('reserve-requeriments-layer-fill');
              }

              if (map.getSource('reserve-requeriments-source-fill')) {
                map.removeSource('reserve-requeriments-source-fill');
              }

              if (map.getLayer('reserve-requeriments-layer-line')) {
                map.removeLayer('reserve-requeriments-layer-line');
              }

              if (map.getSource('reserve-requeriments-source-line')) {
                map.removeSource('reserve-requeriments-source-line');
              }

              map.addSource('reserve-requeriments-source-fill', {
                type: 'geojson',
                data: reserve,
              });

              map.addSource('reserve-requeriments-source-line', {
                type: 'geojson',
                data: reserve,
              });

              map.addLayer({
                id: 'reserve-requeriments-layer-fill',
                source: 'reserve-requeriments-source-fill',
                type: 'fill',
                paint: {
                  'fill-opacity': tiVisibility
                    ? ['case', ['>=', ['get', 'year'], 2019], 0.7, 0.1]
                    : 0,
                },
              });

              map.addLayer({
                id: 'reserve-requeriments-layer-line',
                source: 'reserve-requeriments-source-line',
                type: 'line',
                paint: {
                  'line-opacity': tiVisibility
                    ? ['case', ['>=', ['get', 'year'], 2019], 0.9, 0.7]
                    : 0,
                },
              });

              if (map.getLayer('unity-requeriments-layer-fill')) {
                map.removeLayer('unity-requeriments-layer-fill');
              }

              if (map.getSource('unity-requeriments-source-fill')) {
                map.removeSource('unity-requeriments-source-fill');
              }

              if (map.getLayer('unity-requeriments-layer-line')) {
                map.removeLayer('unity-requeriments-layer-line');
              }

              if (map.getSource('unity-requeriments-source-line')) {
                map.removeSource('unity-requeriments-source-line');
              }

              map.addSource('unity-requeriments-source-fill', {
                type: 'geojson',
                data: unity,
              });

              map.addSource('unity-requeriments-source-line', {
                type: 'geojson',
                data: unity,
              });

              map.addLayer({
                id: 'unity-requeriments-layer-fill',
                source: 'unity-requeriments-source-fill',
                type: 'fill',
                paint: {
                  'fill-opacity': ucVisibility ? 0.1 : 0,
                },
              });

              map.addLayer({
                id: 'unity-requeriments-layer-line',
                source: 'unity-requeriments-source-line',
                type: 'line',
                paint: {
                  'line-opacity': ucVisibility
                    ? ['case', ['>=', ['get', 'year'], 2019], 0.9, 0.7]
                    : 0,
                },
              });

              paintLayers(theme);

              // if (reserve.features.length > 0 && unity.features.length > 0)
              try {
                const [minLng, minLat, maxLng, maxLat] = bbox({
                  type: 'FeatureCollection',
                  features: [...reserve.features, ...unity.features],
                });

                const vp = new WebMercatorViewport(viewport);
                const { longitude, latitude, zoom } = vp.fitBounds(
                  [
                    [minLng, minLat],
                    [maxLng, maxLat],
                  ],
                  {
                    padding: 200,
                  }
                );

                setViewport((vw) => ({
                  ...vw,
                  longitude,
                  latitude,
                  zoom,
                }));
              } catch (err) {
                resetLngLat();
              }
            }
          });
      } else {
        setShapesLoaded(true);
        resetLngLat();

        const map = mapRef.current.getMap();

        if (map.getLayer('reserve-requeriments-layer-fill')) {
          map.removeLayer('reserve-requeriments-layer-fill');
        }

        if (map.getSource('reserve-requeriments-source-fill')) {
          map.removeSource('reserve-requeriments-source-fill');
        }

        if (map.getLayer('reserve-requeriments-layer-line')) {
          map.removeLayer('reserve-requeriments-layer-line');
        }

        if (map.getSource('reserve-requeriments-source-line')) {
          map.removeSource('reserve-requeriments-source-line');
        }

        if (map.getLayer('unity-requeriments-layer-fill')) {
          map.removeLayer('unity-requeriments-layer-fill');
        }

        if (map.getSource('unity-requeriments-source-fill')) {
          map.removeSource('unity-requeriments-source-fill');
        }

        if (map.getLayer('unity-requeriments-layer-line')) {
          map.removeLayer('unity-requeriments-layer-line');
        }

        if (map.getSource('unity-requeriments-source-line')) {
          map.removeSource('unity-requeriments-source-line');
        }
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, mapLoaded]);

  /**
   * Fired when the map style is loaded.
   */
  function onMapLoad() {
    handleUcVisibility(ucVisibility, true);
    handleTiVisibility(tiVisibility, true);
  }

  return (
    <MapContext.Provider
      value={{
        values: {
          mapRef,
          viewport,
          mapLoaded,
          shapesLoaded,
        },
        setters: {
          setViewport,
          setMapLoaded,
          setShapesLoaded,
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
