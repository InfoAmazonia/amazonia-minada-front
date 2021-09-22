import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { dataTypes } from '../../../../../constants/options';
import FilteringContext from '../../../../../contexts/filtering';
import useStyles from './styles';

export default function DataTypeSelector() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();

  const {
    values: { dataType },
    setters: { setDataType },
  } = useContext(FilteringContext);

  const handleChange = (event) => {
    setDataType(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <Typography
        style={{ color: theme.text.tertiary, marginRight: 20 }}
        variant="body2"
      >
        {t(`dashboard.infoPanel.statistics.dataTypeSelectorLabel`)}
      </Typography>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <Select
          value={dataType}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          MenuProps={{ PopoverClasses: { root: classes.menuPopOver } }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {Object.keys(dataTypes).map((key) => (
            <MenuItem key={key} value={key}>
              {t(dataTypes[key].translation)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
