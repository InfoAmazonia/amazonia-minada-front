import {
  ListSubheader,
  Popper,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { breakpoints } from '../../../../constants/constraints';
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

  /**
   * This usEffect does the search.
   */
  useEffect(() => {
    let subscribed = true;

    // The search will work only if the input value has a length bigger than 0 characters.
    if (inputValue.length > 0) {
      api.get(`search/${inputValue}`).then(({ data }) => {
        if (subscribed) {
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

  return (
    <div className={classes.container}>
      <Autocomplete
        id="search-box"
        freeSolo
        autoHighlight
        selectOnFocus
        disableClearable
        forcePopupIcon={false}
        options={options}
        getOptionLabel={(option) => option.value}
        value={value}
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
          <TextField
            {...params}
            margin="none"
            size="small"
            placeholder={t('dashboard.search.bigPlaceholder')}
            variant="outlined"
            classes={{ root: classes.textfield }}
            fullWidth
          />
        )}
        PopperComponent={(props) =>
          options.length > 0 ? (
            <Popper disablePortal={sm} {...props} className={classes.popper} />
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
