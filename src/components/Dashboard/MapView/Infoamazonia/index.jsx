import React from 'react';

import InfoamazoniaLogo from '../../../../assets/images/infoamazonia_map.svg';
import useStyles from './styles';

/**
 * This component encapsulates the Infoamazonia sign.
 */
export default function Infoamazonia() {
  const classes = useStyles();

  return (
    <a
      href="https://infoamazonia.org/"
      target="blank"
      className={classes.container}
    >
      <img
        src={InfoamazoniaLogo}
        alt="Infoamazonia Logo"
        className={classes.logo}
        unselectable="on"
      />
    </a>
  );
}
