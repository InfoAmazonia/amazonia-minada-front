import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import { dataTypes, filterDefaults, propertyTypes } from '../constants/options';
import { useQuery } from '../hooks/useQuery';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ children }) {
  FilteringProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [ucVisibility, setUcVisibility] = useState(filterDefaults.ucVisibility);
  const [tiVisibility, setTiVisibility] = useState(filterDefaults.tiVisibility);
  const [dataType, setDataType] = useState(filterDefaults.dataType);
  const [searchDataType, setSearchDataType] = useState(
    filterDefaults.searchDataType
  );
  const [searchValue, setSearchValue] = useState(filterDefaults.searchValue);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [paramsLoaded, setParamsLoaded] = useState(false);
  const query = useQuery();

  /**
   * This function handles the UC's visibility.
   */
  function handleUcVisibility(newValue) {
    setUcVisibility(newValue);
  }

  /**
   * This function handles the TI's visibility.
   */
  function handleTiVisibility(newValue) {
    setTiVisibility(newValue);
  }

  /**
   * Handle when user clicks to clear search.
   */
  function handleClearSearch() {
    if (window.location.pathname !== '/embed') {
      setSearchValue(filterDefaults.searchValue);
    }

    setTiVisibility(true);
    setUcVisibility(true);
  }

  /**
   * This useEffect loads the filtering provider with the query search params.
   */
  useEffect(() => {
    const ucParam = query.get('uc');
    const tiParam = query.get('ti');
    const dataTypeParam = query.get('dataType');
    const searchParam = query.get('search');

    /**
     * Loads the uc's visibility.
     */
    if (ucParam && (ucParam === 'true' || ucParam === 'false')) {
      setUcVisibility(ucParam === 'true');
    }

    /**
     * Loads the ti's visibility.
     */
    if (tiParam && (tiParam === 'true' || tiParam === 'false')) {
      setTiVisibility(tiParam === 'true');
    }

    /**
     * Loads the dataType.
     */
    if (dataTypeParam && dataTypes[dataTypeParam]) {
      setDataType(dataTypeParam);
    }

    /**
     * Loads the search params.
     */
    if (searchParam) {
      const decodedURI = decodeURI(searchParam);
      const queryObject = JSON.parse(decodedURI);
      const paramsKeys = Object.keys(queryObject);
      let isParamsValid = true;

      for (let i = 0; i < paramsKeys.length; i += 1) {
        if (!propertyTypes[paramsKeys[i]]) {
          isParamsValid = false;
          break;
        }
      }

      if (isParamsValid) {
        if (paramsKeys.length > 1) {
          setIsAdvancedSearch(true);
        } else if (paramsKeys.length === 1) {
          if (queryObject[paramsKeys[0]].length > 1) {
            setIsAdvancedSearch(true);
          }
        }

        setSearchValue(queryObject);
      }
    }

    setParamsLoaded(true);
  }, []);

  /**
   * This useEffect puts the current states into the route.
   */
  useEffect(() => {
    if (paramsLoaded) {
      let newQuery = `${window.location.pathname}?`;

      if (window.location.pathname === '/') {
        newQuery = `/filter?`;
      }

      const initialSize = newQuery.length;

      /**
       * This function verifies if there is a need to add a separator between the query params.
       */
      const trySeparator = () => {
        if (newQuery.length > initialSize) {
          newQuery += '&';
        }
      };

      if (ucVisibility !== filterDefaults.ucVisibility) {
        newQuery += `uc=${ucVisibility}`;
      }

      if (tiVisibility !== filterDefaults.tiVisibility) {
        trySeparator();
        newQuery += `ti=${tiVisibility}`;
      }

      if (dataType !== filterDefaults.dataType) {
        trySeparator();
        newQuery += `dataType=${dataType}`;
      }

      if (Object.keys(searchValue).length > 0) {
        trySeparator();
        const searchValueParams = JSON.stringify(searchValue);
        const searchValueEncoded = encodeURI(searchValueParams);
        newQuery += `search=${searchValueEncoded}`;
      }

      if (newQuery.length === initialSize) {
        window.history.replaceState(null, '', '/');
      } else {
        window.history.replaceState(null, '', newQuery);
      }
    }
  }, [ucVisibility, tiVisibility, dataType, searchValue]);

  return (
    <FilteringContext.Provider
      value={{
        values: {
          ucVisibility,
          tiVisibility,
          dataType,
          searchDataType,
          searchValue,
          isAdvancedSearch,
          isSearchExpanded,
        },
        setters: {
          setDataType,
          setSearchDataType,
          setSearchValue,
          setUcVisibility,
          setTiVisibility,
          setIsAdvancedSearch,
          setIsSearchExpanded,
        },
        functions: {
          handleUcVisibility,
          handleTiVisibility,
          handleClearSearch,
        },
        loaders: {
          paramsLoaded,
        },
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export default FilteringContext;
