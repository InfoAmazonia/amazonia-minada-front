import { Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { Button, Typography, IconButton, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import copy from 'copy-to-clipboard';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from 'react-share';

import { filterDefaults } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import Embedder from './Embedder';
import useStyles from './styles';
/**
 * This component encapsulates the share button.
 */
export default function Share() {
  const classes = useStyles();
  const theme = useTheme();
  const [openShare, setOpenShare] = useState(false);
  const [openEmbed, setOpenEmbed] = useState(false);
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const {
    values: { ucVisibility, tiVisibility, dataType, searchValue },
  } = useContext(FilteringContext);

  const url = useMemo(() => {
    let query = '/filter?';
    const initialSize = query.length;

    /**
     * This function verifies if there is a need to add a separator between the query params.
     */
    function trySeparator() {
      if (query.length > initialSize) {
        query += '&';
      }
    }

    if (ucVisibility !== filterDefaults.ucVisibility) {
      query += `uc=${ucVisibility}`;
    }

    if (tiVisibility !== filterDefaults.tiVisibility) {
      trySeparator();
      query += `ti=${tiVisibility}`;
    }

    if (dataType !== filterDefaults.dataType) {
      trySeparator();
      query += `dataType=${dataType}`;
    }

    if (Object.keys(searchValue).length > 0) {
      trySeparator();
      const searchValueParams = JSON.stringify(searchValue);
      const searchValueEncoded = encodeURI(searchValueParams);
      query += `search=${searchValueEncoded}`;
    }

    if (query.length === initialSize) {
      return window.location.origin;
    }

    return window.location.origin + query;
  }, [ucVisibility, tiVisibility, dataType, searchValue]);

  /**
   * This function handles the share dialog opening.
   */
  function handleShareOpen() {
    setOpenShare(true);
  }

  /**
   * This function handles the share dialog closing.
   */
  function handleShareClose() {
    setOpenShare(false);
    setCopied(false);
  }

  /**
   * This function handles the text copy click.
   */
  function copyLink() {
    copy(url);
    setCopied(true);
  }

  /**
   * This function handles the embedder dialog opening.
   */
  function handleEmbedderOpen() {
    setOpenShare(false);
    setOpenEmbed(true);
  }

  /**
   * This function handles the embedder dialog closing.
   */
  function handleEmbedderClose() {
    setOpenShare(false);
    setOpenEmbed(false);
  }

  /**
   * This function handles the embedder's come back button.
   */
  function handleEmbedderBack() {
    setOpenShare(true);
    setOpenEmbed(false);
  }

  return (
    <>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={() => {
            handleShareOpen();
          }}
        >
          <ShareRoundedIcon style={{ color: theme.text.primary }} />
        </Button>
      </div>
      <Dialog
        open={openShare}
        onClose={() => handleShareClose()}
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
            {t('dashboard.share.title')}
          </Typography>
          <IconButton
            style={{ color: theme.text.primary }}
            size="small"
            onClick={() => handleShareClose()}
          >
            <CloseRoundedIcon />
          </IconButton>
          <span className={classes.separator} />
        </div>
        <div className={classes.content}>
          <Typography
            style={{
              color: theme.text.secondary,
            }}
          >
            {t('dashboard.share.description1')}:
          </Typography>
          <div className={classes.iconsWrapper}>
            <TwitterShareButton title={t('dashboard.share.message')} url={url}>
              <Button
                className={classes.shareButton}
                style={{ marginRight: 5 }}
              >
                <Twitter className={classes.twitterIcon} />
              </Button>
            </TwitterShareButton>
            <FacebookShareButton
              title={t('dashboard.share.message')}
              url={url}
              style={{ marginRight: 5 }}
            >
              <Button className={classes.shareButton}>
                <Facebook className={classes.facebookIcon} />
              </Button>
            </FacebookShareButton>
            <WhatsappShareButton title={t('dashboard.share.message')} url={url}>
              <Button className={classes.shareButton}>
                <WhatsApp className={classes.whatsappIcon} />
              </Button>
            </WhatsappShareButton>
          </div>
          <Typography
            style={{
              color: theme.text.secondary,
            }}
          >
            {t('dashboard.share.description2')}:
          </Typography>
          <div className={classes.copyWrapper}>
            <TextField
              variant="outlined"
              classes={{ root: classes.textfieldRoot }}
              size="small"
              label={t('dashboard.share.textfieldLabel')}
              value={url}
              inputProps={{
                readOnly: true,
              }}
              onFocus={(event) => {
                event.target.select();
              }}
            />
            <Button
              className={classes.copyButton}
              variant="contained"
              disableElevation
              onClick={() => copyLink()}
            >
              {copied
                ? t('dashboard.share.copiedButton')
                : t('dashboard.share.copyButton')}
            </Button>
          </div>
          {window.location.pathname !== '/embed' && (
            <div className={classes.bottomContainer}>
              <Button
                className={classes.embedButton}
                onClick={() => {
                  handleEmbedderOpen();
                }}
              >
                <Typography
                  style={{
                    color: theme.text.secondary,
                  }}
                >
                  {t('dashboard.share.embed')}
                </Typography>
                <NavigateNextRoundedIcon
                  style={{
                    color: theme.text.secondary,
                  }}
                />
              </Button>
            </div>
          )}
        </div>
      </Dialog>
      <Embedder
        open={openEmbed}
        onClose={() => handleEmbedderClose()}
        onComeBack={() => handleEmbedderBack()}
      />
    </>
  );
}
