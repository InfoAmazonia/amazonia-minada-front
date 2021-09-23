import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import { dataTypes, filterDefaults } from '../constants/options';
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
  console.log(Object.keys(searchValue));
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
   * This useEffect loads the filtering provider with the query search params.
   */
  useEffect(() => {
    const ucParam = query.get('uc');
    const tiParam = query.get('ti');
    const dataTypeParam = query.get('dataType');

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
