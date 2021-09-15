import React from 'react';

import useStyles from './styles';

/**
 * This component encapsulates the map's legend.
 */
export default function Legend() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.firstCircle}>
        <div className={classes.secondCircle}>
          <div className={classes.thirdCircle}>
            <div className={classes.fourthCircle} />
          </div>
        </div>
      </div>
    </div>
  );
}
