import React from 'react';

import GeodatinLogo from '../../../../assets/images/geodatin_map.svg';
import useStyles from './styles';

/**
 * This component encapsulates the Geodatin sign.
 */
export default function Geodatin() {
  const classes = useStyles();

  return (
    <a href="https://geodatin.com" target="blank" className={classes.container}>
      <img
        src={GeodatinLogo}
        alt="Geodatin Logo"
        className={classes.logo}
        unselectable="on"
      />
    </a>
  );
}
