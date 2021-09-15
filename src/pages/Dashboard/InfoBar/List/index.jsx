import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ListHeader from '../../../../components/Dashboard/InfoBar/List/ListHeader';
import ListItem from '../../../../components/Dashboard/InfoBar/List/ListItem';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';

/**
 *  This function returns list content.
 */
export default function List() {
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

  return (
    <>
      {contentList && <ListHeader results={contentList.results} />}
      {contentList &&
        contentList.values.map((item) => (
          <ListItem
            key={`${item.process}-${item.type}`}
            title={item.company}
            circleColor={theme.miningProcesses.availableMiningArea}
            infos={[
              { title: 'Processo', data: item.process },
              { title: 'Ano de abertura', data: item.year },
              {
                title: 'Área declarada',
                data: `${t('general.number', { value: item.area })} ha`,
              },
              {
                title: 'Tipo de área',
                data: t(
                  `dashboard.dataType.territorialUnits.${item.type}.singular`
                ),
              },
            ]}
          />
        ))}
    </>
  );
}
