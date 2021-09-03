import { InputBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component works as the simple search autocomplete.
 */
export default function SimpleSearch() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  console.log(classes);

  return (
    <div className={classes.container}>
      <Autocomplete
        freeSolo
        id="search-box"
        disableClearable
        options={[]}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <InputBase
            {...params}
            margin="none"
            size="small"
            placeholder={t('dashboard.search.bigPlaceholder')}
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
