import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import { filterDefaults } from '../constants/options';
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

  const query = useQuery();
  const [ucVisibility, setUcVisibility] = useState(filterDefaults.ucVisibility);
  const [tiVisibility, setTiVisibility] = useState(filterDefaults.tiVisibility);
  const [dataType, setDataType] = useState(filterDefaults.dataType);
  const [searchValue, setSearchValue] = useState(filterDefaults.searchValue);

  /**
   * This function handles the UC's visibility.
   */
  function handleUcVisibility(newValue) {
    // Commented logic: If the TI's visibility is currently setted to off, it's not possible to set off the UC's visibility.
    setUcVisibility(newValue);
  }

  /**
   * This function handles the TI's visibility.
   */
  function handleTiVisibility(newValue) {
    // Commented logic: If the UC's visibility is currently setted to off, it's not possible to set off the TI's visibility.
    setTiVisibility(newValue);
  }

  useEffect(() => {
    console.log(query.get('uc'));
  }, []);

  return (
    <FilteringContext.Provider
      value={{
        values: {
          ucVisibility,
          tiVisibility,
          dataType,
          searchValue,
        },
        setters: {
          setDataType,
          setSearchValue,
          setUcVisibility,
          setTiVisibility,
        },
        functions: {
          handleUcVisibility,
          handleTiVisibility,
        },
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export default FilteringContext;
