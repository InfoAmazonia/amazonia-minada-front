import { CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Legend from '../../../../components/Dashboard/InfoBar/Statistics/Charts/Legend';
import Ranking from '../../../../components/Dashboard/InfoBar/Statistics/Charts/Ranking';
import SemiCircle from '../../../../components/Dashboard/InfoBar/Statistics/Charts/SemiCircle';
import DataTypeSelector from '../../../../components/Dashboard/InfoBar/Statistics/DataTypeSelector';
import GeneralStatistics from '../../../../components/Dashboard/InfoBar/Statistics/GeneralStatistics';
import { filterDefaults } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import useStyles from '../styles';

/**
 *  This function returns statistics content.
 */
export default function Statistics() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const {
    values: { searchValue, ucVisibility, tiVisibility, dataType },
    setters: { setSearchValue },
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
  const [stateRankingData, setStateRankingData] = useState();
  const [stateRankingTotalPages, setStateRankingTotalPages] = useState(1);
  const [stateRankingPage, setStateRankingPage] = useState(1);
  const [stateRankingOrder, setStateRankingOrder] = useState(true);

  /**
   * Indigenous land ranking states
   */
  const [indigenousLandRankingData, setIndigenousLandRankingData] = useState();
  const [indigenousLandRankingTotalPages, setIndigenousLandRankingTotalPages] =
    useState(1);
  const [indigenousLandRankingPage, setIndigenousLandRankingPage] = useState(1);
  const [indigenousLandRankingOrder, setIndigenousLandRankingOrder] =
    useState(true);

  /**
   * Protected area ranking states
   */
  const [protectedAreaRankingData, setProtectedAreaRankingData] = useState();
  const [protectedAreaRankingTotalPages, setProtectedAreaRankingTotalPages] =
    useState(1);
  const [protectedAreaRankingPage, setProtectedAreaRankingPage] = useState(1);
  const [protectedAreaRankingOrder, setProtectedAreaRankingOrder] =
    useState(true);

  /**
   * Company ranking states
   */
  const [companyRankingData, setCompanyRankingData] = useState();
  const [companyRankingTotalPages, setCompanyRankingTotalPages] = useState(1);
  const [companyRankingPage, setCompanyRankingPage] = useState(1);
  const [companyRankingOrder, setCompanyRankingOrder] = useState(true);

  /**
   * Ethnicity ranking states
   */
  const [ethnicityRankingData, setEthnicityRankingData] = useState();
  const [ethnicityRankingTotalPages, setEthnicityRankingTotalPages] =
    useState(1);
  const [ethnicityRankingPage, setEthnicityRankingPage] = useState(1);
  const [ethnicityRankingOrder, setEthnicityRankingOrder] = useState(true);

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
   * This useEffect updates statistics when the visibility is changed.
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
    if (stateRankingData) {
      setStateRankingData((prev) => ({
        ...prev,
        series: prev.series.map((serie) => ({
          ...serie,
          visible: getVisibility(serie.id),
        })),
      }));
    }
    if (companyRankingData) {
      setCompanyRankingData((prev) => ({
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
              data: t('general.number', {
                value: data.requirementsIncidence.total,
              }),
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

  /**
   * This userEffect fetch state ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/state/${dataType}`,
        {
          filters: searchValue,
        },
        {
          params: {
            page: stateRankingPage,
            sortOrder: stateRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setStateRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setStateRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, dataType, stateRankingPage, stateRankingOrder]);

  /**
   * This userEffect fetch indigenous land ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/reserve/${dataType}`,
        {
          filters: searchValue,
        },
        {
          params: {
            page: indigenousLandRankingPage,
            sortOrder: indigenousLandRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setIndigenousLandRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setIndigenousLandRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [
    searchValue,
    dataType,
    indigenousLandRankingPage,
    indigenousLandRankingOrder,
  ]);

  /**
   * This userEffect fetch protected area ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/unity/${dataType}`,
        {
          filters: searchValue,
        },
        {
          params: {
            page: protectedAreaRankingPage,
            sortOrder: protectedAreaRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setProtectedAreaRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setProtectedAreaRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [
    searchValue,
    dataType,
    protectedAreaRankingPage,
    protectedAreaRankingOrder,
  ]);

  /**
   * This userEffect fetch company ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/company/${dataType}`,
        {
          filters: searchValue,
        },
        {
          params: {
            page: companyRankingPage,
            sortOrder: companyRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setCompanyRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setCompanyRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, dataType, companyRankingPage, companyRankingOrder]);

  /**
   * This userEffect fetch ethnicity ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/ethnicity/${dataType}`,
        {
          filters: searchValue,
        },
        {
          params: {
            page: ethnicityRankingPage,
            sortOrder: ethnicityRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setEthnicityRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setEthnicityRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, dataType, ethnicityRankingPage, ethnicityRankingOrder]);

  /**
   * Handle when user clicks to clear search.
   */
  const handleClearSearch = () => {
    setSearchValue(filterDefaults.searchValue);
  };

  return useMemo(
    () =>
      statisticsData ? (
        <div className={classes.wrapperStatistics}>
          {statisticsData.requirementsIncidence.total > 0 ? (
            <>
              {generalStatisticsData && (
                <>
                  <DataTypeSelector />
                  <GeneralStatistics statistics={generalStatisticsData} />
                </>
              )}
              {(tiVisibility || ucVisibility) && ( // show only if one of these is activated
                <>
                  {semiCircleData && (
                    <>
                      <SemiCircle
                        data={semiCircleData}
                        title={t(
                          `dashboard.infoPanel.statistics.charts.semiCircle.title`
                        )}
                        info={t(
                          `dashboard.infoPanel.statistics.charts.semiCircle.info`
                        )}
                      />
                      <Legend data={semiCircleData} />
                    </>
                  )}
                  {stateRankingData && (
                    <Ranking
                      title={t(
                        `dashboard.infoPanel.statistics.charts.ranking.state.title`
                      )}
                      info={t(
                        `dashboard.infoPanel.statistics.charts.ranking.state.info`
                      )}
                      data={stateRankingData}
                      page={stateRankingPage}
                      totalPages={stateRankingTotalPages}
                      setRankingPage={setStateRankingPage}
                      rankingOrder={stateRankingOrder}
                      setRankingOrder={setStateRankingOrder}
                    />
                  )}
                  {tiVisibility && indigenousLandRankingData && (
                    <Ranking
                      title={t(
                        `dashboard.infoPanel.statistics.charts.ranking.indigenousLand.title`
                      )}
                      info={t(
                        `dashboard.infoPanel.statistics.charts.ranking.indigenousLand.info`
                      )}
                      data={indigenousLandRankingData}
                      page={indigenousLandRankingPage}
                      totalPages={indigenousLandRankingTotalPages}
                      setRankingPage={setIndigenousLandRankingPage}
                      rankingOrder={indigenousLandRankingOrder}
                      setRankingOrder={setIndigenousLandRankingOrder}
                    />
                  )}
                  {ethnicityRankingData && (
                    <Ranking
                      title={t(
                        `dashboard.infoPanel.statistics.charts.ranking.ethnicity.title`
                      )}
                      info={t(
                        `dashboard.infoPanel.statistics.charts.ranking.ethnicity.info`
                      )}
                      data={ethnicityRankingData}
                      page={ethnicityRankingPage}
                      totalPages={ethnicityRankingTotalPages}
                      setRankingPage={setEthnicityRankingPage}
                      rankingOrder={ethnicityRankingOrder}
                      setRankingOrder={setEthnicityRankingOrder}
                    />
                  )}
                  {ucVisibility && protectedAreaRankingData && (
                    <Ranking
                      title={t(
                        `dashboard.infoPanel.statistics.charts.ranking.protectedArea.title`
                      )}
                      info={t(
                        `dashboard.infoPanel.statistics.charts.ranking.protectedArea.info`
                      )}
                      data={protectedAreaRankingData}
                      page={protectedAreaRankingPage}
                      totalPages={protectedAreaRankingTotalPages}
                      setRankingPage={setProtectedAreaRankingPage}
                      rankingOrder={protectedAreaRankingOrder}
                      setRankingOrder={setProtectedAreaRankingOrder}
                    />
                  )}
                  {companyRankingData && (
                    <Ranking
                      title={t(
                        `dashboard.infoPanel.statistics.charts.ranking.company.title`
                      )}
                      info={t(
                        `dashboard.infoPanel.statistics.charts.ranking.company.info`
                      )}
                      data={companyRankingData}
                      page={companyRankingPage}
                      totalPages={companyRankingTotalPages}
                      setRankingPage={setCompanyRankingPage}
                      rankingOrder={companyRankingOrder}
                      setRankingOrder={setCompanyRankingOrder}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            // when there is no sufficient data to show statistics
            <Typography variant="body2" style={{ color: theme.text.secondary }}>
              {t(`dashboard.infoPanel.list.header.noResults`)}
              <br />
              {t(`dashboard.infoPanel.list.header.clearSearch`)}{' '}
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleClearSearch()}
                onKeyDown={() => handleClearSearch()}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                {t(`dashboard.infoPanel.list.header.clickingHere`)}
              </span>
            </Typography>
          )}
        </div>
      ) : (
        // while loading statistic data
        <div className={classes.statisticsLoading}>
          <CircularProgress size={20} />
        </div>
      ),
    [
      statisticsData,
      generalStatisticsData,
      semiCircleData,
      indigenousLandRankingData,
      ethnicityRankingData,
      protectedAreaRankingData,
      stateRankingData,
      companyRankingData,
      ucVisibility,
      tiVisibility,
    ]
  );
}
