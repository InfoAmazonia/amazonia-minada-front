import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import useStyles from './styles';

function CustomTooltip(props) {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      {...props}
    />
  );
}

export default CustomTooltip;
