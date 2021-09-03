import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

/**
 * This component encapsulates and alternate tab content.
 */
export default function TabPanel({ children, value, index }) {
  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const classes = useStyles();

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
