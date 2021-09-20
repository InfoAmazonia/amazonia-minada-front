import GetAppIcon from '@mui/icons-material/GetApp';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import RequirementListItem from '../../../../components/Dashboard/InfoBar/List/RequirementListItem';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import useStyles from '../styles';

/**
 *  This function returns list content.
 */
export default function List() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    values: { searchValue, tiVisibility, ucVisibility },
  } = useContext(FilteringContext);

  const [contentList, setContentList] = useState();

  useEffect(() => {
    let isSubscribed = true;

    api
      .post(
        `/invasions`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        { params: { page: 1, pageSize: 50 } }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          setContentList(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, tiVisibility, ucVisibility]);

  const handleDownloadCSV = () => {
    api
      .post(
        `/invasions`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        { params: { page: 1, pageSize: 50, output: 'csv' } }
      )
      .then(({ data }) => {
        const linkCSV = document.createElement('a');
        linkCSV.href = URL.createObjectURL(
          new Blob([data], { type: 'text/csv;charset=utf-8;' })
        );
        linkCSV.setAttribute('download', 'requirements_list.csv');
        linkCSV.click();
      });
  };

  return useMemo(
    () => (
      <div className={classes.wrapperList}>
        {contentList && (
          <>
            <div className={classes.listHeader}>
              <Typography
                variant="body2"
                style={{ color: theme.text.secondary }}
              >
                {t('general.number', { value: contentList.results })}{' '}
                {t(`dashboard.infoPanel.list.header.results`)}
              </Typography>
              <Button
                onClick={() => handleDownloadCSV()}
                startIcon={<GetAppIcon />}
              >
                <Typography
                  variant="caption"
                  style={{ color: theme.text.primary }}
                >
                  {t(`dashboard.infoPanel.list.header.downloadCSV`)}
                </Typography>
              </Button>
            </div>
            {contentList.values.map((item) => (
              <RequirementListItem
                key={`${item.process}-${item.type}`}
                data={item}
              />
            ))}
          </>
        )}
      </div>
    ),
    [contentList]
  );
}
