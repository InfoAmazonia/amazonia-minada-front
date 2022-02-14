import React from 'react';

import AmazonWatchLogo from '../../../../assets/images/amazonwatch.png';
import useStyles from './styles';

/**
 * This component encapsulates the AmazonWatch sign.
 */
export default function AmazonWatch() {
  const classes = useStyles();

  return (
    <a
      href="https://amazonwatch.org/"
      target="blank"
      className={classes.container}
    >
      <img
        src={AmazonWatchLogo}
        alt="Amazon Watch Logo"
        className={classes.logo}
        unselectable="on"
      />
    </a>
  );
}
