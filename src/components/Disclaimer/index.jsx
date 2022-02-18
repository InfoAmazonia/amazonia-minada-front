/* eslint import/no-unresolved: off */

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Typography, IconButton, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component encapsulates the share button.
 */
export default function Disclaimer() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [openDisclaimer, setOpenDisclaimer] = useState(true);

  /**
   * This function handles the share dialog closing.
   */
  function handleDisclaimerClose() {
    setOpenDisclaimer(false);
  }

  return (
    <Dialog
      open={openDisclaimer}
      onClose={() => handleDisclaimerClose()}
      classes={{ root: classes.dialogContainer }}
    >
      <div className={classes.header}>
        <Typography
          style={{
            color: theme.text.primary,
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          {t('dashboard.disclaimer.title')}
        </Typography>
        <IconButton
          style={{ color: theme.text.primary }}
          size="small"
          onClick={() => handleDisclaimerClose()}
        >
          <CloseRoundedIcon />
        </IconButton>
        <span className={classes.separator} />
      </div>
      <div className={classes.content}>
        <div>
          <iframe
            width="100%"
            height="230"
            src="https://www.youtube.com/embed/oela7cDoyzY?autoplay=1?loop=1"
            title="Disclaimer video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography
            style={{
              color: theme.text.secondary,
            }}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit
            amet.., comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et
            Malorum by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </Typography>
        </div>
      </div>
      <div style={{ padding: 15, width: '100%' }}>
        <Button
          className={classes.accessButton}
          variant="contained"
          disableElevation
          onClick={() => handleDisclaimerClose()}
        >
          Acessar a plataforma
        </Button>
      </div>
    </Dialog>
  );
}
