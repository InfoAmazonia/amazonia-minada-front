/* eslint import/no-unresolved: off */

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Typography, IconButton, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import MapContext from '../../contexts/mapping';
import useStyles from './styles';

/**
 * This component encapsulates the share button.
 */
export default function Disclaimer() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    values: { openDisclaimer },
    setters: { setOpenDisclaimer },
  } = useContext(MapContext);

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
            src="https://www.youtube.com/embed/WTIn-0Z0DN8?autoplay=1?loop=1"
            title="Disclaimer video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p style={{ marginTop: 10, textAlign: 'justify' }}>
          <Typography
            style={{
              color: theme.text.secondary,
            }}
          >
            Este dashboard mostra os processos minerários na Amazônia brasileira
            que nunca poderiam ter sido registrados.
            <br />
            <br />
            No Brasil, a mineração em terras indígenas e unidades de conservação
            integral é proibida. Apesar disso, milhares de requerimentos são
            mantidos válidos no sistema da Agência Nacional de Mineração (ANM) –
            o órgão do governo federal responsável por autorizar e fiscalizar a
            atividade.
            <br />
            <br />
            Os dados neste site são atualizados diariamente e você pode navegar
            pelo mapa, pesquisar e filtrar os dados e baixar os resultados da
            sua busca de forma aberta.
            <br />
            <br />
            Assista o vídeo acima para instruções de uso da plataforma e
            consulte a{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://infoamazonia.org/project/amazonia-minada/"
              style={{ color: theme.button.primary }}
            >
              página do projeto Amazônia Minada no site do InfoAmazonia
            </a>{' '}
            para mais informações. Siga também o perfil{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/amazonia_minada"
              style={{ color: theme.button.primary }}
            >
              @amazonia_minada no Twitter
            </a>{' '}
            para saber sempre que um novo processo aparecer aqui.
          </Typography>
        </p>
      </div>
      <div style={{ padding: 15, width: '100%' }}>
        <Button
          className={classes.accessButton}
          variant="contained"
          disableElevation
          onClick={() => handleDisclaimerClose()}
        >
          Fechar
        </Button>
      </div>
    </Dialog>
  );
}
