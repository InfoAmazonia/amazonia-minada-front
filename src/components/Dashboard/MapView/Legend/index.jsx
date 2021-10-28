import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component encapsulates the map's legend.
 */
export default function Legend({ defaultOpen }) {
  Legend.defaultProps = {
    defaultOpen: false,
  };

  Legend.propTypes = {
    defaultOpen: PropTypes.bool,
  };

  const classes = useStyles();
  const [open, setOpen] = useState(defaultOpen);
  const { t } = useTranslation();
  const theme = useTheme();

  /**
   * Sets the open state to defaultOpen;
   */
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className={classes.container}>
      <div
        className={classes.buttonContainer}
        style={open ? {} : { boxShadow: theme.defaultShadow }}
      >
        <Button
          className={classes.button}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open && (
            <div className={classes.firstCircle}>
              <div className={classes.secondCircle}>
                <div className={classes.thirdCircle}>
                  <div className={classes.fourthCircle} />
                </div>
              </div>
            </div>
          )}
          {open && (
            <div className={classes.closeButtonContainer}>
              <CloseRoundedIcon />
            </div>
          )}
        </Button>
      </div>
      {open && (
        <div className={classes.openedContainer}>
          <div className={classes.contentBlock}>
            <div className={classes.title}>
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.legend.territorialTitle')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.territorialUnits.mapIndigenousLand,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.legend.indigenousLand')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.territorialUnits.mapProtectedArea,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.legend.protectedArea')}
              </Typography>
            </div>
          </div>
          <div className={classes.contentBlock}>
            <div className={classes.title}>
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.legend.miningProcessesTitle')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.miningProcesses.miningConcession,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.dataType.miningProcesses.miningConcession')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.miningProcesses.smallScaleMining,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.dataType.miningProcesses.smallScaleMining')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor:
                    theme.miningProcesses.miningResearchAuthorization,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t(
                  'dashboard.dataType.miningProcesses.miningResearchAuthorization'
                )}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.miningProcesses.miningResearchRequest,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.dataType.miningProcesses.miningResearchRequest')}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor:
                    theme.miningProcesses.smallScaleMiningRequest,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t(
                  'dashboard.dataType.miningProcesses.smallScaleMiningRequest'
                )}
              </Typography>
            </div>
            <div className={classes.item}>
              <div
                className={classes.circle}
                style={{
                  backgroundColor: theme.miningProcesses.availableMiningArea,
                }}
              />
              <Typography style={{ color: theme.text.primary }}>
                {t('dashboard.dataType.miningProcesses.availableMiningArea')}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
