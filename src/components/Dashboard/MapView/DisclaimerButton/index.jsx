/* eslint-disable no-unused-vars */
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTheme } from 'react-jss';

import MapContext from '../../../../contexts/mapping';
import useStyles from './styles';

/**
 * This component opens disclaimer modal.
 */
export default function DisclaimerButton() {
  const classes = useStyles();
  const theme = useTheme();
  const {
    setters: { setOpenDisclaimer },
  } = useContext(MapContext);

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        onClick={() => {
          setOpenDisclaimer(true);
        }}
      >
        <InfoOutlinedIcon />
      </Button>
    </div>
  );
}
