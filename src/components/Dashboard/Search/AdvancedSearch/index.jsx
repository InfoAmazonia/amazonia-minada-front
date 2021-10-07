/* eslint-disable no-nested-ternary */
import { InfoOutlined } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  IconButton,
  ListSubheader,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { breakpoints } from '../../../../constants/constraints';
import { filterDefaults } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import CustomButton from '../../../CustomButton';
import CustomTooltip from '../../../CustomTooltip';
import SearchDataTypeSelector from './SearchDataTypeSelector';
import useStyles from './styles';

/**
 * This component works as the advanced search autocomplete.
 */
export default function AdvancedSearch() {
  const {
    values: {
      searchValue,
      searchDataType,
      isAdvancedSearch,
      isSearchExpanded,
      reservePhases,
      requirementPhases,
      availableYears,
    },
    setters: { setSearchValue, setIsAdvancedSearch, setIsSearchExpanded },
    loaders: { paramsLoaded },
  } = useContext(FilteringContext);

  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();
  const sm = useMediaQuery(breakpoints.max.sm);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const [activeFilters, setActiveFilters] = useState([]);

  /**
   * This function returns if there is active filters.
   */
  const isActiveFilters = () => activeFilters.length > 0;

  /**
   * This function returns if the search datatype is provided by a selection.
   */
  const isSelection = () =>
    searchDataType === 'year' ||
    searchDataType === 'requirementPhase' ||
    searchDataType === 'reservePhase';

  /**
   * This function clear the autocomplete selection.
   */
  const clearAutocomplete = () => {
    setInputValue('');
    setValue(null);
  };

  /**
   * This useEffect change options according by search data type.
   */
  useEffect(() => {
    if (searchDataType === 'year') {
      setOptions(availableYears);
    } else if (searchDataType === 'requirementPhase') {
      setOptions(requirementPhases);
    } else if (searchDataType === 'reservePhase') {
      setOptions(reservePhases);
    }
    clearAutocomplete();
  }, [searchDataType]);

  /**
   * This useEffect loads the search value with the route params.
   */
  useEffect(() => {
    const activeFiltersAux = [];

    Object.keys(searchValue).forEach((key) => {
      searchValue[key].forEach((val) =>
        activeFiltersAux.push({ type: key, value: val })
      );
    });

    setActiveFilters(activeFiltersAux);
  }, [paramsLoaded]);

  /**
   * This useEffect does the search.
   */
  useEffect(() => {
    let subscribed = true;

    // The search will work only if the input value has a length bigger than 0 characters and when not is selection.
    if (
      inputValue.length > 0 &&
      inputValue.trim().length > 0 &&
      !isSelection()
    ) {
      setLoading(true);

      api.get(`search/${inputValue}`).then(({ data }) => {
        if (subscribed) {
          setLoading(false);
          let newOptions = [];

          if (
            value &&
            data.filter((o) => o.type === value.type && o.value === value.value)
              .length === 0
          ) {
            newOptions = [value];
          }

          if (data) {
            newOptions = [...newOptions, ...data];
          }

          setOptions(newOptions.filter((o) => o.type === searchDataType));
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [value, inputValue]);

  /**
   * This useEffect push the selected value to the search value.
   */
  useEffect(() => {
    if (value) {
      // push to search value structure and uses a Set to not repeat element
      setSearchValue((prev) => ({
        ...prev,
        [value.type]: prev[value.type]
          ? [...new Set([...prev[value.type], ...[value.value]])]
          : [value.value],
      }));

      // push to active filters array and uses a find function to not repeat element
      setActiveFilters((prev) =>
        prev.find((o) => o.type === value.type && o.value === value.value)
          ? prev
          : [...prev, value]
      );
      clearAutocomplete();
    }
  }, [value]);

  /**
   * This useEffect clean the value when searchValue is empty.
   */
  useEffect(() => {
    if (Object.keys(searchValue).length === 0) {
      clearAutocomplete();
      setActiveFilters([]);
    }
  }, [searchValue]);

  /**
   * This function handles when the user switches between search types.
   */
  const handleFilterSwitcher = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  /**
   * This function handles when user minimizes the search.
   */
  const handleSearchMinimize = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  /**
   * This function handles when the user clear the search.
   */
  const handleClearSearch = () => {
    setSearchValue(filterDefaults.searchValue);
  };

  /**
   * This function handles when the user removes a filter.
   */
  const handleRemoveFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.filter((o) => o.value !== filter.value && o.type !== filter.value)
    );
    setSearchValue((prev) => {
      if (prev[filter.type].length > 1) {
        return {
          ...prev,
          [filter.type]: prev[filter.type].filter((el) => el !== filter.value),
        };
      }
      // delete filter property
      const { [filter.type]: del, ...rest } = prev;
      return rest;
    });
  };

  /**
   * This function returns a filter icon.
   */
  const getFilterIcon = (filter) => (
    <div
      key={filter.type + filter.value}
      style={{ borderColor: theme.grouping[filter.type] }}
      className={
        isSearchExpanded
          ? classes.filterIconWrapper
          : classes.filterIconWrapperMinimized
      }
    >
      <div className={classes.filterIcon}>
        <Typography
          variant="body2"
          style={{
            fontSize: 12,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.grouping[filter.type],
            lineHeight: 'initial',
          }}
        >
          {filter.value}
        </Typography>
        <IconButton
          style={{ visibility: isSearchExpanded ? 'visible' : 'hidden' }}
          className={classes.iconButton}
          size="small"
          onClick={() => handleRemoveFilter(filter)}
        >
          <CloseRoundedIcon style={{ fontSize: 14 }} />
        </IconButton>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      <div className={classes.searchHeaderWrapper}>
        <div
          style={{ display: isSearchExpanded ? 'block' : 'none' }}
          className={classes.dataTypeFilterSelector}
        >
          <SearchDataTypeSelector />
        </div>
        <span
          style={{ display: isSearchExpanded ? 'flex' : 'none' }}
          className={classes.separator}
        />
        <Autocomplete
          id="search-box"
          autoHighlight
          selectOnFocus
          disableClearable
          loading={!isSelection() ? loading : false}
          loadingText={t('dashboard.search.searching')}
          forcePopupIcon={false}
          options={options}
          value={value}
          noOptionsText={t('dashboard.search.noOptions')}
          className={classes.autocomplete}
          getOptionLabel={(option) => String(option.value)}
          getOptionSelected={(option) =>
            option.type === value.type && option.value === value.value
          }
          onChange={(event, newValue) => {
            if (!isSelection()) {
              setOptions(newValue ? [newValue, ...options] : options);
            }
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <>
              <div className={classes.buttons}>
                {isSearchExpanded ? (
                  <SearchRoundedIcon className={classes.searchIcon} />
                ) : (
                  <IconButton
                    className={classes.iconButton}
                    size="small"
                    onClick={() => handleSearchMinimize()}
                  >
                    <KeyboardArrowDownRoundedIcon />
                  </IconButton>
                )}
              </div>
              <TextField
                style={{
                  display: isSearchExpanded
                    ? 'flex'
                    : isActiveFilters()
                    ? 'none'
                    : 'flex',
                }}
                {...params}
                inputRef={inputRef}
                margin="none"
                size="small"
                placeholder={
                  !isSelection()
                    ? t('dashboard.search.smallPlaceholder')
                    : t('dashboard.search.selectPlaceholder')
                }
                variant="outlined"
                classes={{ root: classes.textfield }}
                fullWidth
                onClick={() => setIsSearchExpanded(true)}
              />
            </>
          )}
          PopperComponent={(props) =>
            inputValue === '' && !isSelection() ? null : (
              <Popper
                ref={autocompleteRef}
                disablePortal={sm}
                {...props}
                className={classes.popper}
              />
            )
          }
          renderGroup={(params, index) => [
            <ListSubheader key={`${params.group}_${index}`} component="div">
              {t(`dashboard.search.grouping.${params.group}`)}
            </ListSubheader>,
            params.children,
          ]}
          groupBy={(option) => option.type}
        />
      </div>
      <div className={classes.searchFooterWrapper}>
        {isActiveFilters() && (
          <>
            {isSearchExpanded ? (
              <div className={classes.activeFilters}>
                {activeFilters.map((filter) => getFilterIcon(filter))}
              </div>
            ) : (
              <CustomButton
                className={classes.activeFiltersMinimized}
                handleOnClick={handleSearchMinimize}
              >
                {activeFilters.map((filter) => getFilterIcon(filter))}
              </CustomButton>
            )}
          </>
        )}
        <div
          style={{ display: isSearchExpanded ? 'flex' : 'none' }}
          className={classes.textButtonsWrapper}
        >
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <CustomTooltip
              title={t('dashboard.search.searchInfo')}
              placement="bottom"
            >
              <InfoOutlined
                style={{
                  color: theme.text.tertiary,
                  marginRight: 10,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              />
            </CustomTooltip>

            <CustomButton
              handleOnClick={
                isActiveFilters() ? handleClearSearch : handleFilterSwitcher
              }
            >
              <Typography
                style={{ color: theme.text.tertiary }}
                variant="body2"
              >
                {isActiveFilters()
                  ? t(`dashboard.search.clearSearch`)
                  : t(`dashboard.search.doSimpleSearch`)}
              </Typography>
            </CustomButton>
          </div>
          <CustomButton
            className={classes.minimizeButton}
            handleOnClick={handleSearchMinimize}
          >
            <Typography
              style={{ color: theme.text.tertiary, marginRight: 3 }}
              variant="body2"
            >
              {t(`dashboard.search.minimize`)}
            </Typography>
            <KeyboardArrowUpRoundedIcon style={{ fontSize: 14 }} />
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
