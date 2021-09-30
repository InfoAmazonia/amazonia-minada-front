import { InfoOutlined } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
import CustomTooltip from '../../../CustomTooltip';
import SearchDataTypeSelector from './SearchDataTypeSelector';
import useStyles from './styles';

/**
 * This component works as the advanced search autocomplete.
 */
export default function AdvancedSearch() {
  const {
    values: { searchValue, searchDataType, isAdvancedSearch },
    setters: { setSearchValue, setIsAdvancedSearch },
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
  /*   const [isExpanded, setIsExpanded] = useState(true); */
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const [activeFilters, setActiveFilters] = useState([]);

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

    // The search will work only if the input value has a length bigger than 0 characters.
    if (inputValue.length > 0 && inputValue.trim().length > 0) {
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

      setInputValue('');
      setValue(null);
    }
  }, [value]);

  /**
   * This useEffect clean the value when searchValue is empty.
   */
  useEffect(() => {
    if (Object.keys(searchValue).length === 0) {
      setInputValue('');
      setValue(null);
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
    // logic to minimize here
  };

  /**
   * This function handles when the user switches between search types.
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

  const getFilterIcon = (filter) => (
    <div
      key={filter.type + filter.value}
      style={{ borderColor: theme.grouping[filter.type] }}
      className={classes.filterIconWrapper}
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
      <div style={{ display: 'flex', flexFlow: 'row nowrap', paddingLeft: 20 }}>
        <div className={classes.dataTypeFilterSelector}>
          <SearchDataTypeSelector />
        </div>
        <span className={classes.separator} />
        <Autocomplete
          id="search-box"
          autoHighlight
          selectOnFocus
          disableClearable
          loading={loading}
          loadingText={t('dashboard.search.searching')}
          forcePopupIcon={false}
          options={options}
          getOptionLabel={(option) => option.value}
          value={value}
          noOptionsText={t('dashboard.search.noOptions')}
          className={classes.autocomplete}
          getOptionSelected={(option) =>
            option.type === value.type && option.value === value.value
          }
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <>
              <div className={classes.buttons}>
                <SearchRoundedIcon className={classes.searchIcon} />
              </div>
              <TextField
                {...params}
                inputRef={inputRef}
                margin="none"
                size="small"
                placeholder={t('dashboard.search.smallPlaceholder')}
                variant="outlined"
                classes={{ root: classes.textfield }}
                fullWidth
              />
            </>
          )}
          PopperComponent={(props) =>
            inputValue !== '' ? (
              <Popper
                ref={autocompleteRef}
                disablePortal={sm}
                {...props}
                className={classes.popper}
              />
            ) : null
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
      <div
        className={
          activeFilters.length > 0
            ? classes.searchFooterWrapperActive
            : classes.searchFooterWrapper
        }
      >
        {activeFilters.length > 0 && (
          <div className={classes.activeFilters}>
            {activeFilters.map((filter) => getFilterIcon(filter))}
          </div>
        )}
        <div className={classes.textButtonsWrapper}>
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <CustomTooltip title="Teste" placement="bottom">
              <InfoOutlined
                style={{
                  color: theme.text.tertiary,
                  marginRight: 10,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              />
            </CustomTooltip>
            {activeFilters.length >= 1 ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleClearSearch()}
                onKeyDown={() => handleClearSearch()}
                className={classes.textButton}
              >
                <Typography
                  style={{ color: theme.text.tertiary }}
                  variant="body2"
                >
                  {t(`dashboard.search.clearSearch`)}
                </Typography>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleFilterSwitcher()}
                onKeyDown={() => handleFilterSwitcher()}
                className={classes.textButton}
              >
                <Typography
                  style={{ color: theme.text.tertiary }}
                  variant="body2"
                >
                  {t(`dashboard.search.doSimpleSearch`)}
                </Typography>
              </div>
            )}
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSearchMinimize()}
            onKeyDown={() => handleSearchMinimize()}
            className={classes.minimizeButton}
          >
            <Typography
              style={{ color: theme.text.tertiary, marginRight: 3 }}
              variant="body2"
            >
              {t(`dashboard.search.minimize`)}
            </Typography>
            <KeyboardArrowUpRoundedIcon style={{ fontSize: 14 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
