/* eslint-disable no-unused-vars */
import GetAppIcon from '@mui/icons-material/GetApp';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
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
export default function List({ tabPanelRef }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    values: { searchValue, tiVisibility, ucVisibility },
  } = useContext(FilteringContext);

  const [contentList, setContentList] = useState([]);
  const [resultsAmount, setResultsAmount] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isBottom, setIsBottom] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
  /**
   * This userEffect check if the bottom is reached by scroll bar.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (
        tabPanelRef.current.scrollHeight - tabPanelRef.current.scrollTop ===
        tabPanelRef.current.clientHeight
      ) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    tabPanelRef.current.addEventListener('scroll', handleScroll);

    return () =>
      tabPanelRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * This userEffect get nexts pages when bottom is reached to make infinite scroll.
   */
  useEffect(() => {
    let isSubscribed = true;
    const nextPage = page + 1;
    if (isBottom && nextPage <= maxPage) {
      setIsLoadingPage(true);
      api
        .post(
          `/invasions`,
          {
            filters: searchValue,
            enableUnity: ucVisibility,
            enableReserve: tiVisibility,
          },
          { params: { page: nextPage, pageSize: 10 } }
        )
        .then(({ data }) => {
          if (isSubscribed) {
            setContentList(contentList.concat(data.values));
            setIsLoadingPage(false);
            setPage(nextPage);
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [isBottom]);

  /**
   * This userEffect returns the search results.
   */
  useEffect(() => {
    let isSubscribed = true;
    setIsLoadingFirst(true);
    setContentList([]);
    api
      .post(
        `/invasions`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        { params: { page: 1, pageSize: 10 } }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          setResultsAmount(data.results);
          setMaxPage(data.pages);
          tabPanelRef.current.scrollTo(0, 0);
          setContentList(data.values);
          setIsLoadingFirst(false);
          setPage(1);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, tiVisibility, ucVisibility]);

  /**
   * This function fetches CSV file from server to download.
   */
  const handleDownloadCSV = () => {
    setIsDownloadingCSV(true);
    api
      .post(
        `/invasions`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        { params: { output: 'csv' } }
      )
      .then(({ data }) => {
        const linkCSV = document.createElement('a');
        linkCSV.href = URL.createObjectURL(
          new Blob([data], { type: 'text/csv;charset=utf-8;' })
        );
        linkCSV.setAttribute('download', 'requirements_list.csv');
        linkCSV.click();
        setIsDownloadingCSV(false);
      });
  };

  return useMemo(
    () => (
      <div className={classes.wrapperList}>
        {contentList && !isLoadingFirst && (
          <>
            <div className={classes.listHeader}>
              <Typography
                variant="body2"
                style={{ color: theme.text.secondary }}
              >
                {t('general.number', { value: resultsAmount })}{' '}
                {t(`dashboard.infoPanel.list.header.results`)}
              </Typography>
              <Button
                onClick={() => handleDownloadCSV()}
                startIcon={
                  isDownloadingCSV ? (
                    <CircularProgress size={15} />
                  ) : (
                    <GetAppIcon />
                  )
                }
                disabled={!(resultsAmount > 0)}
              >
                <Typography
                  variant="caption"
                  style={{ color: theme.text.primary }}
                >
                  {t(`dashboard.infoPanel.list.header.downloadCSV`)}
                </Typography>
              </Button>
            </div>
            {contentList.map((item) => (
              <RequirementListItem
                key={`${item.process}-${item.type}`}
                data={item}
              />
            ))}
          </>
        )}
        <div className={classes.listFooter}>
          <CircularProgress
            style={{
              display: isLoadingPage || isLoadingFirst ? 'inline' : 'none',
            }}
            size={20}
          />
          <Typography
            style={{
              display: page === maxPage && !isLoadingFirst ? 'inline' : 'none',
              color: theme.text.secondary,
            }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.footer.noMoreResults`)}
          </Typography>
        </div>
      </div>
    ),
    [
      contentList,
      isDownloadingCSV,
      isLoadingFirst,
      isLoadingPage,
      page,
      maxPage,
    ]
  );
}
