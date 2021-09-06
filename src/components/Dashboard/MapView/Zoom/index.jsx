import { Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useTheme } from 'react-jss';

import MapContext from '../../../../contexts/mapping';
import useStyles from './styles';

/**
 * This component encapsulates the zoom buttons.
 */
export default function Zoom() {
  const classes = useStyles();
  const theme = useTheme();
  const { viewport, setViewport } = useContext(MapContext);

  /**
   * This function adds zoom to the map's viewport.
   */
  function addZoom() {
    if (viewport.zoom < 22) {
      setViewport((vw) => ({ ...vw, zoom: vw.zoom + 0.5 }));
    }
  }

  /**
   * This function remove zoom from the map's viewport.
   */
  function minusZoom() {
    if (viewport.zoom > 0) {
      setViewport((vw) => ({ ...vw, zoom: vw.zoom - 0.5 }));
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Button
          className={classes.button}
          onClick={() => {
            addZoom();
          }}
        >
          <Typography
            style={{ color: theme.text.primary, fontSize: 22, fontWeight: 400 }}
            className={classes.n}
          >
            +
          </Typography>
        </Button>
      </div>
      <div className={classes.container}>
        <Button
          className={classes.button}
          onClick={() => {
            minusZoom();
          }}
        >
          <Typography
            style={{ color: theme.text.primary, fontSize: 30, fontWeight: 500 }}
            className={classes.n}
          >
            -
          </Typography>
        </Button>
      </div>
    </>
  );
}
