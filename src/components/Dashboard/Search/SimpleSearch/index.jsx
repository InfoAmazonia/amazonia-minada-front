import {
  IconButton,
  ListSubheader,
  Popper,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { breakpoints } from '../../../../constants/constraints';
import { filterDefaults } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import useStyles from './styles';

/**
 * This component works as the simple search autocomplete.
 */
export default function SimpleSearch() {
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
  const {
    setters: { setSearchValue },
  } = useContext(FilteringContext);

  /**
   * This usEffect does the search.
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

          setOptions(newOptions);
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [value, inputValue]);

  /**
   * Handles the autocomplete's extra button, that works as a cleaner when there is
   * an input value, and as an expansion button when the autocomplete is empty.
   */
  function handleExtraButton() {
    if (value || inputValue.length > 0) {
      inputRef.current.blur();
      setInputValue('');
      setValue(null);
    }
  }

  /**
   * This useEffect converts the value to the searchValue.
   */
  useEffect(() => {
    if (value) {
      setSearchValue(() => ({
        [value.type]: [value.value],
      }));
    } else {
      setSearchValue(filterDefaults.searchValue);
    }
  }, [value]);

  return (
    <div className={classes.container}>
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
              <span className={classes.separator} />
              <IconButton
                className={classes.iconButton}
                size="small"
                onClick={() => handleExtraButton()}
              >
                {inputValue === '' ? <TuneRoundedIcon /> : <CloseRoundedIcon />}
              </IconButton>
            </div>
            <TextField
              {...params}
              inputRef={inputRef}
              margin="none"
              size="small"
              placeholder={t('dashboard.search.bigPlaceholder')}
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
  );
}
