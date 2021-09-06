/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useGeneralStyles from '../styles';
import useStyles from './styles';

export default function Legend({ data }) {
  Legend.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  const theme = useTheme();
  const generalClasses = useGeneralStyles();
  const classes = useStyles();
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const legendItem = (id, name, value, color) => (
    <div key={id} role="button" tabIndex={0} className={classes.legendItem}>
      <div
        className={classes.circle}
        style={{
          backgroundColor: color,
        }}
      />
      <div className={classes.columnLegendItem}>
        <Typography
          style={{
            whiteSpace: 'nowrap',
            fontSize: 12,
            color: theme.text.tertiary,
          }}
          variant="caption"
        >
          {name}
        </Typography>
        <Typography
          style={{ color, fontSize: 16, fontWeight: 700 }}
          variant="h6"
        >
          {t('general.roundNumber', { value })} ha
        </Typography>
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: 0 }} className={generalClasses.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.line}>
          {data.map((item) =>
            legendItem(item.id, item.name, item.y, item.color)
          )}
        </div>
      </div>
    </div>
  );
}
