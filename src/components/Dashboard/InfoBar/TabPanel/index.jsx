import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

export default function TabPanel({ children, value, index }) {
  const classes = useStyles();
  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    index: PropTypes.any.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  };

  return (
    <div
      className={classes.wrapper}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div style={{ marginTop: 20 }}>{children}</div>}
    </div>
  );
}
