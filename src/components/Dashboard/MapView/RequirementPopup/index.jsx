/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Popup } from 'react-map-gl';

import useStyles from './styles';

/**
 * This component encapsulates the requirement popup.
 */
export default function RequirementPopup({
  feature,
  lng,
  lat,
  accessTerritory,
  closePopup,
}) {
  RequirementPopup.defaultProps = {
    feature: null,
    lng: null,
    lat: null,
    accessTerritory: null,
    closePopup: null,
  };

  RequirementPopup.propTypes = {
    feature: PropTypes.shape(),
    lng: PropTypes.number,
    lat: PropTypes.number,
    accessTerritory: PropTypes.func,
    closePopup: PropTypes.func,
  };

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Popup
      className={classes.popup}
      latitude={lat}
      longitude={lng}
      closeButton={false}
    >
      <Typography
        style={{ color: theme.text.primary, fontSize: 12, fontWeight: 500 }}
        className={classes.n}
      >
        {feature.properties.company
          ? feature.properties.company
          : feature.properties.NOME}
      </Typography>
      <div className={classes.separator} />
      <Typography
        style={{ color: theme.text.secondary, fontSize: 11 }}
        variant="caption"
      >
        {t(`dashboard.infoPanel.list.item.process`)}
      </Typography>
      <Typography style={{ color: theme.text.primary }} variant="body1">
        {feature.properties.process
          ? feature.properties.process
          : feature.properties.PROCESSO}
      </Typography>

      {feature.properties.FASE && (
        <>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.miningProcess`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {feature.properties.FASE}
          </Typography>
        </>
      )}

      {(feature.properties.TI_NOME || feature.properties.UC_NOME) && (
        <>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.territory`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {feature.properties.TI_NOME || feature.properties.UC_NOME}
          </Typography>
        </>
      )}

      <Typography
        style={{ color: theme.text.secondary, fontSize: 11 }}
        variant="caption"
      >
        {t(`dashboard.infoPanel.list.item.year`)}
      </Typography>
      <Typography style={{ color: theme.text.primary }} variant="body1">
        {feature.properties.year
          ? feature.properties.year
          : feature.properties.ANO}
      </Typography>
      <Typography
        style={{ color: theme.text.secondary, fontSize: 11 }}
        variant="caption"
      >
        {t(`dashboard.infoPanel.list.item.area`)}
      </Typography>
      <Typography style={{ color: theme.text.primary }} variant="body1">
        {feature.properties.area
          ? t('general.number', { value: feature.properties.area })
          : feature.properties.AREA_HA}{' '}
        ha
      </Typography>
      <Typography
        style={{ color: theme.text.secondary, fontSize: 11 }}
        variant="caption"
      >
        {t(`dashboard.infoPanel.list.item.substance`)}
      </Typography>
      <Typography style={{ color: theme.text.primary }} variant="body1">
        {feature.properties.substance
          ? feature.properties.substance
          : feature.properties.SUBS}
      </Typography>

      {feature.properties.ULT_EVENTO && (
        <>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.lastEvent`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {feature.properties.ULT_EVENTO}
          </Typography>
        </>
      )}
    </Popup>
  );
}
