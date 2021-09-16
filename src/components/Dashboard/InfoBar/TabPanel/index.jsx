/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';

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
      style={
        value === index
          ? { opacity: 1, height: '100%' }
          : { opacity: 0, height: 0, pointerEvents: 'none', userSelect: 'none' }
      }
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <div
        style={{
          marginTop: 20,
        }}
      >
        {children}
      </div>
    </div>
  );
}
