/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Legend from '../../../../components/Dashboard/InfoBar/Statistics/Charts/Legend';
import Ranking from '../../../../components/Dashboard/InfoBar/Statistics/Charts/Ranking';
import SemiCircle from '../../../../components/Dashboard/InfoBar/Statistics/Charts/SemiCircle';
import DataTypeSelector from '../../../../components/Dashboard/InfoBar/Statistics/DataTypeSelector';
import GeneralStatistics from '../../../../components/Dashboard/InfoBar/Statistics/GeneralStatistics';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';

/**
 *  This function returns statistics content.
 */
export default function Statistics() {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    values: { searchValue, ucVisibility, tiVisibility, dataType },
  } = useContext(FilteringContext);

  /**
   * This state stores the result of request that comprises general statistics and semi circle.
   */
  const [statisticsData, setStatisticsData] = useState();

  /**
   * This state stores the formatted data to send to the general statistics component.
   */
  const [generalStatisticsData, setGeneralStatisticsData] = useState();

  /**
   * This state stores the formatted data to send to the semi circle component.
   */
  const [semiCircleData, setSemiCircleData] = useState();

  /**
   * UF ranking states
   */
  const [stateRankingData, setStateRankingData] = useState({});
  const [stateRankingTotalPages /* setRankingTotalPages */] = useState(1);
  const [stateRankingPage, setStateRankingPage] = useState(1);
  const [stateRankingOrder, setStateRankingOrder] = useState(true);

  /**
   * Indigenous land ranking states
   */
  const [indigenousLandRankingData, setIndigenousLandRankingData] = useState(
    {}
  );
  const [indiginegousLandRankingTotalPages /* setRankingTotalPages */] =
    useState(1);
  const [indigenousLandRankingPage, setIndigenousLandRankingPage] = useState(1);
  const [indigenousLandRankingOrder, setIndigenousLandRankingOrder] =
    useState(true);

  /**
   * Protected area ranking states
   */
  const [protectedAreaRankingData, setProtectedAreaRankingData] = useState({});
  const [protectedAreaRankingTotalPages /* setRankingTotalPages */] =
    useState(1);
  const [protectedAreaRankingPage, setProtectedAreaRankingPage] = useState(1);
  const [protectedAreaRankingOrder, setProtectedAreaRankingOrder] =
    useState(true);

  /**
   * Company ranking states
   */
  const [companyRankingData, setCompanyRankingData] = useState({});
  const [companyTotalPages /* setRankingTotalPages */] = useState(1);
  const [companyRankingPage, setCompanyRankingPage] = useState(1);
  const [companyRankingOrder, setCompanyRankingOrder] = useState(true);

  /**
   * This function returns current visibility of a territorial unit.
   * @param {string} territorialUnit
   */
  const getVisibility = (territorialUnit) => {
    if (territorialUnit === 'indigenousLand') {
      return tiVisibility;
    }
    if (territorialUnit === 'protectedArea') {
      return ucVisibility;
    }
    return false;
  };

  /**
   * This useEffect updates semi circle data when the visibility is changed.
   */
  useEffect(() => {
    if (semiCircleData) {
      setSemiCircleData((prev) => ({
        ...prev,
        series: prev.series.map((serie) => ({
          ...serie,
          visible: getVisibility(serie.id),
        })),
      }));
    }
  }, [ucVisibility, tiVisibility]);

  /**
   * This useEffect fetch statistics data from server and set general statistics.
   */
  useEffect(() => {
    let isSubscribed = true;

    api
      .post(`/statistics`, {
        filters: searchValue,
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setStatisticsData(data);
          setGeneralStatisticsData([
            {
              title: t(
                'dashboard.infoPanel.statistics.generalStatistics.illegalRequirements'
              ),
              data: data.requirementsIncidence.total,
            },
            {
              title: t(
                'dashboard.infoPanel.statistics.generalStatistics.totalArea'
              ),
              data: `${t('general.number', {
                value: data.requiredArea.total,
              })} ha`,
            },
          ]);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue]);

  /**
   * This useEffect updates semi circle data when data or datatype is changed.
   */
  useEffect(() => {
    if (statisticsData) {
      const data = {
        series: [
          {
            id: 'indigenousLand',
            name: t(
              `dashboard.dataType.territorialUnits.indigenousLand.singular`
            ),
            color: theme.territorialUnits.indigenousLand,
            y: statisticsData[dataType].reserve,
            visible: getVisibility('indigenousLand'),
          },
          {
            id: 'protectedArea',
            name: t(
              `dashboard.dataType.territorialUnits.protectedArea.singular`
            ),
            color: theme.territorialUnits.protectedArea,
            y: statisticsData[dataType].unity,
            visible: getVisibility('protectedArea'),
          },
        ],
        dataType,
      };
      setSemiCircleData(data);
    }
  }, [statisticsData, dataType]);

  useEffect(() => {
    const data = {
      x: ['Amazonas', 'Amapá', 'Pará', 'Roraima', 'Tocantins'],
      position: [1, 2, 3, 4, 5],
      series: [
        {
          id: 'indigenousLand',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
        {
          id: 'protectedArea',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
      ],
      pageAmount: 1,
      dataType,
    };
    data.series = data.series.map((obj) => {
      obj.color = theme.territorialUnits[`${obj.id}`];
      obj.visible = getVisibility(obj.id);
      obj.name = t(`dashboard.dataType.territorialUnits.${obj.id}.singular`);
      return obj;
    });
    setStateRankingData(data);
    setStateRankingPage(1);
  }, [dataType]);

  useEffect(() => {
    const data = {
      x: ['Sai-cinza', 'Munduruku', 'Kayabi', 'Baú', 'Kayapó'],
      position: [1, 2, 3, 4, 5],
      series: [
        {
          id: 'indigenousLand',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
      ],
      pageAmount: 1,
      dataType,
    };
    data.series = data.series.map((obj) => {
      obj.color = theme.territorialUnits[`${obj.id}`];
      obj.visible = getVisibility(obj.id);
      obj.name = t(`dashboard.dataType.territorialUnits.${obj.id}.singular`);
      return obj;
    });
    setIndigenousLandRankingData(data);
    setIndigenousLandRankingPage(1);
  }, [dataType]);

  useEffect(() => {
    const data = {
      x: [
        'Serra do pardo',
        'Chapada das mesas',
        'Jaú',
        'Uatumã',
        'Rio Trombetas',
      ],
      position: [1, 2, 3, 4, 5],
      series: [
        {
          id: 'protectedArea',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
      ],
      pageAmount: 1,
      dataType,
    };
    data.series = data.series.map((obj) => {
      obj.color = theme.territorialUnits[`${obj.id}`];
      obj.visible = getVisibility(obj.id);
      obj.name = t(`dashboard.dataType.territorialUnits.${obj.id}.singular`);
      return obj;
    });
    setProtectedAreaRankingData(data);
    setProtectedAreaRankingPage(1);
  }, [dataType]);

  useEffect(() => {
    const data = {
      x: [
        'Gold LTDA',
        'Silver LTDA',
        'Nickel LTDA',
        'Diamond LTDA',
        'Bronze LTDA',
      ],
      position: [1, 2, 3, 4, 5],
      series: [
        {
          id: 'indigenousLand',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
        {
          id: 'protectedArea',
          data: [10638678.67, 2134950.19, 1807626.79, 1449245.12, 1031380.07],
        },
      ],
      pageAmount: 1,
      dataType,
    };
    data.series = data.series.map((obj) => {
      obj.color = theme.territorialUnits[`${obj.id}`];
      obj.visible = getVisibility(obj.id);
      obj.name = t(`dashboard.dataType.territorialUnits.${obj.id}.singular`);
      return obj;
    });
    setCompanyRankingData(data);
    setCompanyRankingPage(1);
  }, [dataType]);

  return useMemo(
    () => (
      <>
        {semiCircleData && (
          <>
            <DataTypeSelector />
            <GeneralStatistics statistics={generalStatisticsData} />
            <SemiCircle
              data={semiCircleData}
              title={t(
                `dashboard.infoPanel.statistics.charts.semiCircle.title`
              )}
              info={t(`dashboard.infoPanel.statistics.charts.semiCircle.info`)}
            />
            <Legend data={semiCircleData} />
          </>
        )}

        <Ranking
          title={t(`dashboard.infoPanel.statistics.charts.ranking.state.title`)}
          info={t(`dashboard.infoPanel.statistics.charts.ranking.state.info`)}
          data={stateRankingData}
          rankingOrder={stateRankingOrder}
          setRankingOrder={setStateRankingOrder}
        />
        {tiVisibility && (
          <Ranking
            title={t(
              `dashboard.infoPanel.statistics.charts.ranking.indigenousLand.title`
            )}
            info={t(
              `dashboard.infoPanel.statistics.charts.ranking.indigenousLand.info`
            )}
            data={indigenousLandRankingData}
            rankingOrder={indigenousLandRankingOrder}
            setRankingOrder={setIndigenousLandRankingOrder}
          />
        )}

        {ucVisibility && (
          <Ranking
            title={t(
              `dashboard.infoPanel.statistics.charts.ranking.protectedArea.title`
            )}
            info={t(
              `dashboard.infoPanel.statistics.charts.ranking.protectedArea.info`
            )}
            data={protectedAreaRankingData}
            rankingOrder={protectedAreaRankingOrder}
            setRankingOrder={setProtectedAreaRankingOrder}
          />
        )}

        <Ranking
          title={t(
            `dashboard.infoPanel.statistics.charts.ranking.company.title`
          )}
          info={t(`dashboard.infoPanel.statistics.charts.ranking.company.info`)}
          data={companyRankingData}
          rankingOrder={companyRankingOrder}
          setRankingOrder={setCompanyRankingOrder}
        />
      </>
    ),
    [
      generalStatisticsData,
      semiCircleData,
      indigenousLandRankingData,
      protectedAreaRankingData,
      stateRankingData,
      companyRankingData,
      ucVisibility,
      tiVisibility,
    ]
  );
}
