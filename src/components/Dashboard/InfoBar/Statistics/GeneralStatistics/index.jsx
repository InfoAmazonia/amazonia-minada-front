import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component provides general statistics content.
 */
export default function GeneralStatistics({ statistics }) {
  GeneralStatistics.propTypes = {
    statistics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };
  const theme = useTheme();
  const classes = useStyles({ theme });

  if (!statistics) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.statisticItems}>
        {statistics.map((item) => (
          <div key={item.title} className={classes.statisticItem}>
            <Typography
              style={{
                color: theme.text.primary,
                fontSize: 16,
                fontWeight: 700,
              }}
              variant="h6"
            >
              {item.data}
            </Typography>
            <Typography
              style={{ color: theme.text.tertiary, fontSize: 11 }}
              variant="caption"
            >
              {item.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
