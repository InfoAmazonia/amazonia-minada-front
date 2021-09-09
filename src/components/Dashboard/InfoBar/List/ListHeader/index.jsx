import { Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component represents a list header.
 */
export default function ListHeader({ results }) {
  ListHeader.propTypes = {
    results: PropTypes.number.isRequired,
  };
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper}>
      <Typography variant="body2" style={{ color: theme.text.secondary }}>
        {results} resultados encontrados
      </Typography>
      <Button startIcon={<GetAppIcon />}>
        <Typography variant="caption" style={{ color: theme.text.primary }}>
          Baixar CSV
        </Typography>
      </Button>
    </div>
  );
}
