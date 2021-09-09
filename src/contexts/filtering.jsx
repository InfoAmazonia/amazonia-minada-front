import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import { filterDefaults } from '../constants/options';

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

  const [ucVisibility, setUcVisibility] = useState(true);
  const [tiVisibility, setTiVisibility] = useState(true);
  const [dataType, setDataType] = useState('requiredArea');
  const [searchValue, setSearchValue] = useState(filterDefaults.searchValue);

  /**
   * This function handles the UC's visibility.
   */
  function handleUcVisibility(newValue) {
    // Commented logic: If the TI's visibility is currently setted to off, it's not possible to set off the UC's visibility.
    /* if (newValue || (!newValue && tiVisibility)) {
      setUcVisibility(newValue);
    } */
    setUcVisibility(newValue);
  }

  /**
   * This function handles the TI's visibility.
   */
  function handleTiVisibility(newValue) {
    // Commented logic: If the UC's visibility is currently setted to off, it's not possible to set off the TI's visibility.
    /* if (newValue || (!newValue && ucVisibility)) {
      setTiVisibility(newValue);
    } */
    setTiVisibility(newValue);
  }

  return (
    <FilteringContext.Provider
      value={{
        values: {
          ucVisibility,
          tiVisibility,
          dataType,
          searchValue,
        },
        setters: { setDataType, setSearchValue },
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
