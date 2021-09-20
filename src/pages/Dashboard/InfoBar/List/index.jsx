import { Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
                {contentList.results} resultados encontrados
              </Typography>
              <Button startIcon={<GetAppIcon />}>
                <Typography
                  variant="caption"
                  style={{ color: theme.text.primary }}
                >
                  Baixar CSV
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
