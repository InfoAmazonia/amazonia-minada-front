import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component encapsulates the map's loader.
 */
export default function Loader({ loading }) {
  Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div className={classes.container} style={{ opacity: loading ? 1 : 0 }}>
      <CircularProgress className={classes.circularProgress} />
      <Typography
        style={{ color: theme.text.primary, fontSize: 14, fontWeight: 400 }}
      >
        {t('dashboard.map.loadingShapes')}
      </Typography>
    </div>
  );
}
