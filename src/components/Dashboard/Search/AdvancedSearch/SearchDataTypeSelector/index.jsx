import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { searchDataTypes } from '../../../../../constants/options';
import FilteringContext from '../../../../../contexts/filtering';
import useStyles from './styles';

export default function SearchDataTypeSelector() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();

  const {
    values: { searchDataType },
    setters: { setSearchDataType },
  } = useContext(FilteringContext);

  const handleChange = (event) => {
    setSearchDataType(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <Select
          value={searchDataType}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          MenuProps={{ PopoverClasses: { root: classes.menuPopOver } }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {Object.keys(searchDataTypes).map((key) => (
            <MenuItem key={key} value={key}>
              {t(searchDataTypes[key].translation)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
