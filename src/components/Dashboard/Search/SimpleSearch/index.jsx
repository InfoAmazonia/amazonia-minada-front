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
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const {
    values: { simpleSearchValue },
    setters: { setSimpleSearchValue },
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
            simpleSearchValue &&
            data.filter(
              (o) =>
                o.type === simpleSearchValue.type &&
                o.value === simpleSearchValue.value
            ).length === 0
          ) {
            newOptions = [simpleSearchValue];
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
  }, [simpleSearchValue, inputValue]);

  function handleExtraButton() {
    if (simpleSearchValue || inputValue.length > 0) {
      inputRef.current.blur();
      setInputValue('');
      setSimpleSearchValue(null);
    }
  }

  /* function handleSearchButton() {
    if (options[0]) {
      setSimpleSearchValue(options[0]);
    }

    inputRef.current.blur();
  } */

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
        value={simpleSearchValue}
        noOptionsText={t('dashboard.search.noOptions')}
        className={classes.autocomplete}
        getOptionSelected={(option) =>
          option.type === simpleSearchValue.type &&
          option.value === simpleSearchValue.value
        }
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setSimpleSearchValue(newValue);
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
