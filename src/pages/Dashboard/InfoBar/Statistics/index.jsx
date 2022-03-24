/* eslint-disable no-nested-ternary */
import { CircularProgress, Typography } from '@mui/material';
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
    functions: { handleClearSearch },
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
   * Use ranking states
   */
  const [useRankingData, setUseRankingData] = useState();
  const [useRankingTotalPages, setUseRankingTotalPages] = useState(1);
  const [useRankingPage, setUseRankingPage] = useState(1);
  const [useRankingOrder, setUseRankingOrder] = useState(true);

  /**
   * Substance ranking states
   */
  const [substanceRankingData, setSubstanceRankingData] = useState();
  const [substanceRankingTotalPages, setSubstanceRankingTotalPages] =
    useState(1);
  const [substanceRankingPage, setSubstanceRankingPage] = useState(1);
  const [substanceRankingOrder, setSubstanceRankingOrder] = useState(true);

  /**
   * Requirement phase ranking states
   */
  const [phaseRankingData, setPhaseRankingData] = useState();
  const [phaseRankingTotalPages, setPhaseRankingTotalPages] = useState(1);
  const [phaseRankingPage, setPhaseRankingPage] = useState(1);
  const [phaseRankingOrder, setPhaseRankingOrder] = useState(true);

  /**
   * This useEffect set all rankings to page one when the search is modified.
   */
  useEffect(() => {
    setStateRankingPage(1);
    setIndigenousLandRankingPage(1);
    setProtectedAreaRankingPage(1);
    setCompanyRankingPage(1);
    setEthnicityRankingTotalPages(1);
    setUseRankingTotalPages(1);
    setSubstanceRankingTotalPages(1);
    setPhaseRankingTotalPages(1);
  }, [searchValue]);

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
    if (useRankingData) {
      setUseRankingData((prev) => ({
        ...prev,
        series: prev.series.map((serie) => ({
          ...serie,
          visible: getVisibility(serie.id),
        })),
      }));
    }
    if (substanceRankingData) {
      setSubstanceRankingData((prev) => ({
        ...prev,
        series: prev.series.map((serie) => ({
          ...serie,
          visible: getVisibility(serie.id),
        })),
      }));
    }
    if (phaseRankingData) {
      setPhaseRankingData((prev) => ({
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
                value:
                  ucVisibility && tiVisibility
                    ? data.requirementsIncidence.total
                    : ucVisibility
                    ? data.requirementsIncidence.unity
                    : tiVisibility
                    ? data.requirementsIncidence.reserve
                    : 0,
              }),
            },
            {
              title: t(
                'dashboard.infoPanel.statistics.generalStatistics.totalArea'
              ),
              data: `${t('general.number', {
                value:
                  ucVisibility && tiVisibility
                    ? data.requiredArea.total
                    : ucVisibility
                    ? data.requiredArea.unity
                    : tiVisibility
                    ? data.requiredArea.reserve
                    : 0,
              })} ha`,
            },
          ]);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchValue, ucVisibility, tiVisibility]);

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
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
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
  }, [
    searchValue,
    dataType,
    stateRankingPage,
    stateRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

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
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
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
    ucVisibility,
    tiVisibility,
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
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
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
    ucVisibility,
    tiVisibility,
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
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
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
  }, [
    searchValue,
    dataType,
    companyRankingPage,
    companyRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

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
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
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
  }, [
    searchValue,
    dataType,
    ethnicityRankingPage,
    ethnicityRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

  /**
   * This userEffect fetch use ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/use/${dataType}`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        {
          params: {
            page: useRankingPage,
            sortOrder: useRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setUseRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setUseRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [
    searchValue,
    dataType,
    useRankingPage,
    useRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

  /**
   * This userEffect fetch substance ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/substance/${dataType}`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        {
          params: {
            page: substanceRankingPage,
            sortOrder: substanceRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setSubstanceRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setSubstanceRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [
    searchValue,
    dataType,
    substanceRankingPage,
    substanceRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

  /**
   * This userEffect fetch phase ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/invasions/ranking/requirementPhase/${dataType}`,
        {
          filters: searchValue,
          enableUnity: ucVisibility,
          enableReserve: tiVisibility,
        },
        {
          params: {
            page: phaseRankingPage,
            sortOrder: phaseRankingOrder ? 'DESC' : 'ASC',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setPhaseRankingTotalPages(data.pageAmount);
            data.series = data.series.map((obj) => {
              obj.color = theme.territorialUnits[obj.id];
              obj.visible = getVisibility(obj.id);
              obj.name = t(
                `dashboard.dataType.territorialUnits.${obj.id}.singular`
              );
              return obj;
            });
          }
          setPhaseRankingData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [
    searchValue,
    dataType,
    phaseRankingPage,
    phaseRankingOrder,
    ucVisibility,
    tiVisibility,
  ]);

  return useMemo(
    () =>
      statisticsData ? (
        <div className={classes.wrapperStatistics}>
          {statisticsData.requirementsIncidence.total > 0 && // check if there are requirements
          (tiVisibility || ucVisibility) ? ( // show only if one of these is activated
            <>
              {generalStatisticsData && (
                <>
                  <GeneralStatistics statistics={generalStatisticsData} />
                  <DataTypeSelector />
                </>
              )}
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
              {tiVisibility && ethnicityRankingData && (
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
              {substanceRankingData && (
                <Ranking
                  title={t(
                    `dashboard.infoPanel.statistics.charts.ranking.substance.title`
                  )}
                  info={t(
                    `dashboard.infoPanel.statistics.charts.ranking.substance.info`
                  )}
                  data={substanceRankingData}
                  page={substanceRankingPage}
                  totalPages={substanceRankingTotalPages}
                  setRankingPage={setSubstanceRankingPage}
                  rankingOrder={substanceRankingOrder}
                  setRankingOrder={setSubstanceRankingOrder}
                />
              )}
              {phaseRankingData && (
                <Ranking
                  title={t(
                    `dashboard.infoPanel.statistics.charts.ranking.requirementPhase.title`
                  )}
                  info={t(
                    `dashboard.infoPanel.statistics.charts.ranking.requirementPhase.info`
                  )}
                  data={phaseRankingData}
                  page={phaseRankingPage}
                  totalPages={phaseRankingTotalPages}
                  setRankingPage={setPhaseRankingPage}
                  rankingOrder={phaseRankingOrder}
                  setRankingOrder={setPhaseRankingOrder}
                />
              )}
              {useRankingData && (
                <Ranking
                  title={t(
                    `dashboard.infoPanel.statistics.charts.ranking.use.title`
                  )}
                  info={t(
                    `dashboard.infoPanel.statistics.charts.ranking.use.info`
                  )}
                  data={useRankingData}
                  page={useRankingPage}
                  totalPages={useRankingTotalPages}
                  setRankingPage={setUseRankingPage}
                  rankingOrder={useRankingOrder}
                  setRankingOrder={setUseRankingOrder}
                />
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
      useRankingData,
      substanceRankingData,
      phaseRankingData,
      ucVisibility,
      tiVisibility,
    ]
  );
}
