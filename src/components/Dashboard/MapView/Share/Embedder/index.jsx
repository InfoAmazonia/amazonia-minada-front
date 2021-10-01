import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button, Typography, IconButton, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import {
  embedDefaults,
  filterDefaults,
} from '../../../../../constants/options';
import FilteringContext from '../../../../../contexts/filtering';
import useStyles from './styles';

/**
 * This component encapsulates the share button.
 */
export default function Embedder({ open, onClose, onComeBack }) {
  Embedder.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onComeBack: PropTypes.func.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [isZoomEnabled, setIsZoomEnabled] = useState(embedDefaults.zoomEnabled);
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(
    embedDefaults.navigationEnabled
  );
  const [isNorthEnabled, setIsNorthEnabled] = useState(
    embedDefaults.northEnabled
  );
  const [isPanelEnabled, setIsPanelEnabled] = useState(
    embedDefaults.panelEnabled
  );
  const [isShapeActivationEnabled, setIsShapeActivationEnabled] = useState(
    embedDefaults.visibilityButtonsEnabled
  );
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(
    embedDefaults.shareButtonEnabled
  );
  const [isSearchEnabled, setIsSearchEnabled] = useState(
    embedDefaults.searchEnabled
  );
  const [isLegendEnabled, setIsLegendEnabled] = useState(
    embedDefaults.legendEnabled
  );
  const [legendOpenByDefault, setLegendOpenByDefault] = useState(
    embedDefaults.legendOpenByDefault
  );

  const {
    values: { ucVisibility, tiVisibility, dataType, searchValue },
  } = useContext(FilteringContext);

  const code = useMemo(() => {
    let embedQuery = '/embed?';
    const initialSize = embedQuery.length;

    /**
     * This function verifies if there is a need to add a separator between the query params.
     */
    function trySeparator() {
      if (embedQuery.length > initialSize) {
        embedQuery += '&';
      }
    }

    if (ucVisibility !== filterDefaults.ucVisibility) {
      embedQuery += `uc=${ucVisibility}`;
    }

    if (tiVisibility !== filterDefaults.tiVisibility) {
      trySeparator();
      embedQuery += `ti=${tiVisibility}`;
    }

    if (dataType !== filterDefaults.dataType) {
      trySeparator();
      embedQuery += `dataType=${dataType}`;
    }

    if (Object.keys(searchValue).length > 0) {
      trySeparator();
      const searchValueParams = JSON.stringify(searchValue);
      const searchValueEncoded = encodeURI(searchValueParams);
      embedQuery += `search=${searchValueEncoded}`;
    }

    trySeparator();
    embedQuery += `zoomEnabled=${isZoomEnabled}`;

    trySeparator();
    embedQuery += `navigationEnabled=${isNavigationEnabled}`;

    trySeparator();
    embedQuery += `northEnabled=${isNorthEnabled}`;

    trySeparator();
    embedQuery += `panelEnabled=${isPanelEnabled}`;

    trySeparator();
    embedQuery += `shapeActivationEnabled=${isShapeActivationEnabled}`;

    trySeparator();
    embedQuery += `shareEnabled=${isShareButtonEnabled}`;

    trySeparator();
    embedQuery += `searchEnabled=${isSearchEnabled}`;

    trySeparator();
    embedQuery += `legendEnabled=${isLegendEnabled}`;

    trySeparator();
    embedQuery += `legendOpen=${legendOpenByDefault}`;

    return `<iframe src="${window.location.origin}${embedQuery}" width="900" height="600"></iframe>`;
  }, [
    ucVisibility,
    tiVisibility,
    dataType,
    searchValue,
    isZoomEnabled,
    isNavigationEnabled,
    isNorthEnabled,
    isPanelEnabled,
    isShapeActivationEnabled,
    isShareButtonEnabled,
    isSearchEnabled,
    isLegendEnabled,
    legendOpenByDefault,
  ]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
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
            {t('dashboard.share.embedder.title')}
          </Typography>
          <IconButton
            style={{ color: theme.text.primary }}
            size="small"
            onClick={() => onClose()}
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
            {t('dashboard.share.embedder.configureText')}:
          </Typography>
          <div className={classes.optionsWrapper}>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={<Checkbox size="medium" checked={isZoomEnabled} />}
                label={t('dashboard.share.embedder.isZoomEnabled')}
                onChange={(event, newValue) => setIsZoomEnabled(newValue)}
                className={
                  isZoomEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={isNavigationEnabled} />
                }
                label={t('dashboard.share.embedder.isNavigationEnabled')}
                onChange={(event, newValue) => setIsNavigationEnabled(newValue)}
                className={
                  isNavigationEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={<Checkbox size="medium" checked={isNorthEnabled} />}
                label={t('dashboard.share.embedder.isNorthEnabled')}
                onChange={(event, newValue) => setIsNorthEnabled(newValue)}
                className={
                  isNorthEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={<Checkbox size="medium" checked={isSearchEnabled} />}
                label={t('dashboard.share.embedder.isSearchEnabled')}
                onChange={(event, newValue) => setIsSearchEnabled(newValue)}
                className={
                  isSearchEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              {isLegendEnabled && (
                <FormControlLabel
                  control={
                    <Checkbox size="medium" checked={legendOpenByDefault} />
                  }
                  label={t('dashboard.share.embedder.legendOpenByDefault')}
                  onChange={(event, newValue) =>
                    setLegendOpenByDefault(newValue)
                  }
                  className={
                    legendOpenByDefault
                      ? classes.formLabelChecked
                      : classes.formLabelDisabled
                  }
                />
              )}
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={<Checkbox size="medium" checked={isPanelEnabled} />}
                label={t('dashboard.share.embedder.isPanelEnabled')}
                onChange={(event, newValue) => setIsPanelEnabled(newValue)}
                className={
                  isPanelEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={isShapeActivationEnabled} />
                }
                label={t('dashboard.share.embedder.isShapeActivationEnabled')}
                onChange={(event, newValue) =>
                  setIsShapeActivationEnabled(newValue)
                }
                className={
                  isShapeActivationEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={isShareButtonEnabled} />
                }
                label={t('dashboard.share.embedder.isShareButtonEnabled')}
                onChange={(event, newValue) =>
                  setIsShareButtonEnabled(newValue)
                }
                className={
                  isShareButtonEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
              <FormControlLabel
                control={<Checkbox size="medium" checked={isLegendEnabled} />}
                label={t('dashboard.share.embedder.isLegendEnabled')}
                onChange={(event, newValue) => setIsLegendEnabled(newValue)}
                className={
                  isLegendEnabled
                    ? classes.formLabelChecked
                    : classes.formLabelDisabled
                }
              />
            </FormGroup>
          </div>
          <Typography
            style={{
              color: theme.text.secondary,
            }}
          >
            {t('dashboard.share.embedder.code')}:
          </Typography>
          <div className={classes.copyWrapper}>
            <TextField
              variant="outlined"
              classes={{ root: classes.textfieldRoot }}
              size="small"
              value={code}
              multiline
              maxRows={6}
            />
          </div>
          <div className={classes.bottomContainer}>
            <Button
              className={classes.comeBackButton}
              onClick={() => {
                onComeBack();
              }}
            >
              <Typography
                style={{
                  color: theme.text.secondary,
                }}
              >
                {t('dashboard.share.embedder.comeBack')}
              </Typography>
              <NavigateNextRoundedIcon
                style={{
                  color: theme.text.secondary,
                  transform: 'rotate(180deg)',
                }}
              />
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
