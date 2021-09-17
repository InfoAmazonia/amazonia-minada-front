/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import FilteringContext from '../../../../../../contexts/filtering';
import useGeneralStyles from '../styles';
import useStyles from './styles';

export default function Legend({ data }) {
  Legend.propTypes = {
    data: PropTypes.shape().isRequired,
  };

  const {
    values: { ucVisibility, tiVisibility },
    setters: { setTiVisibility, setUcVisibility },
  } = useContext(FilteringContext);

  const theme = useTheme();
  const generalClasses = useGeneralStyles();
  const classes = useStyles();
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const handleFilters = (id) => {
    if (id === 'protectedArea') {
      setUcVisibility(!ucVisibility);
    }
    if (id === 'indigenousLand') {
      setTiVisibility(!tiVisibility);
    }
  };

  const legendItem = (id, name, value, color, visible) => (
    <div
      key={id}
      role="button"
      tabIndex={0}
      className={classes.legendItem}
      onClick={() => handleFilters(id)}
      onKeyDown={() => handleFilters(id)}
    >
      <div
        className={classes.circle}
        style={{
          backgroundColor: visible ? color : theme.grey,
        }}
      />
      <div className={classes.columnLegendItem}>
        <Typography
          style={{
            whiteSpace: 'nowrap',
            fontSize: 12,
            color: visible ? theme.text.primary : theme.grey,
          }}
          variant="caption"
        >
          {name}
        </Typography>
        <Typography
          style={{
            color: visible ? theme.text.primary : theme.grey,
            fontSize: 16,
            fontWeight: 700,
          }}
          variant="h6"
        >
          {t('general.roundNumber', { value })}{' '}
          {data.dataType === 'requiredArea' && 'ha'}
        </Typography>
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: 0 }} className={generalClasses.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.line}>
          {data.series.map((item) =>
            legendItem(item.id, item.name, item.y, item.color, item.visible)
          )}
        </div>
      </div>
    </div>
  );
}
