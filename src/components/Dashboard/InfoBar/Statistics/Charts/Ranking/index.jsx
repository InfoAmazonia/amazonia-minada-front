/* eslint-disable no-nested-ternary */
import { InfoOutlined } from '@mui/icons-material/';
import { Pagination } from '@mui/lab';
import { useMediaQuery } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import sankey from 'highcharts/modules/sankey';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { breakpoints } from '../../../../../../constants/constraints';
import useOptions from '../../../../../../hooks/options';
import CustomTooltip from '../../../../../CustomTooltip';
import useStyles from '../styles';

highchartsMore(Highcharts);
sankey(Highcharts);

export default function Ranking({
  title,
  data,
  info,
  setRankingOrder,
  rankingOrder,
  totalPages,
  page,
  setRankingPage,
}) {
  Ranking.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setRankingPage: PropTypes.func.isRequired,
    rankingOrder: PropTypes.bool.isRequired,
    setRankingOrder: PropTypes.func.isRequired,
    data: PropTypes.shape().isRequired,
  };

  /**
   * The component will be rendered only if there are data.
   */
  if (!data) {
    return null;
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();
  const isSmd = useMediaQuery(breakpoints.max.smd);
  const isSm = useMediaQuery(breakpoints.max.sm);
  const isXsm = useMediaQuery(breakpoints.max.xsm);
  const defaultOptions = useOptions();
  const [, /* chartObj */ setChartObj] = useState();

  const options = {
    chart: {
      type: 'bar',
      events: {
        render() {
          if (data.dataType === 'requiredArea') {
            const chart = this;
            chart.series.forEach((s) => {
              s.points.forEach((p) => {
                if (p.dataLabel) {
                  p.dataLabel.attr({
                    x: chart.plotWidth - p.dataLabel.width,
                  });
                }
              });
            });
          }
        },
      },
      ...defaultOptions.chart,
    },
    credits: defaultOptions.credits,
    title: {
      text: `${title} ${t(
        `dashboard.dataType.${data.dataType}`
      ).toLowerCase()}`,
      ...defaultOptions.title,
    },
    xAxis: {
      ...defaultOptions.xAxis,
      gridLineWidth: 0,
      labels: {
        style: {
          fontSize: '13px',
          color: theme.text.secondary,
          ...defaultOptions.xAxis.labels.style,
        },
        align: 'left',
        reserveSpace: true,
        formatter: (obj) => `${data.position[obj.pos]}° ${obj.value}`,
      },
      categories: data.x,
    },
    yAxis: {
      ...defaultOptions.yAxis,
      gridLineWidth: 0,
      title: {
        enabled: false,
      },
      labels: {
        enabled: false,
      },
      stackLabels: data.dataType === 'requirementsIncidence' && {
        enabled: true,
        style: {
          color: theme.text.tertiary,
          textOutline: false,
          fontSize: '12px',
          fontWeight: 800,
          fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
        },
      },
      width:
        data.dataType === 'requiredArea' && isXsm
          ? '50%'
          : isSm
          ? '70%'
          : isSmd
          ? '80%'
          : '70%',
    },
    legend: defaultOptions.legend,
    tooltip: {
      useHTML: true,
      formatter() {
        return `<b>${this.series.name}</b> </br>
            <tr><td style="color: ${this.series.color}">${t(
          `dashboard.dataType.${data.dataType}`
        )}: </td>
              <td style="text-align: right"><b>${t('general.roundNumber', {
                value: this.point.y,
              })} ${data.dataType === 'requiredArea' ? 'ha' : ''}
            </b></td></tr>`;
      },
    },
    plotOptions: {
      bar: {
        pointWidth: 23,
        borderWidth: 0,
      },
      series: {
        pointStart: 0,
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          style:
            data.dataType === 'requiredArea'
              ? {
                  color: theme.text.tertiary,
                  textOutline: false,
                  fontSize: '12px',
                  fontWeight: 500,
                }
              : {
                  color: theme.text.primary,
                  textOutline: false,
                  fontSize: '12px',
                  fontWeight: 800,
                  fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
                },
          formatter() {
            if (data.dataType === 'requiredArea') {
              return `${t('general.roundNumber', {
                value: this.total,
              })} ha`;
            }
            return `${t('general.roundNumber', {
              value: this.y,
            })}`;
          },
        },
      },
    },
    series: data.series,
    navigation: defaultOptions.navigation,
    lang: defaultOptions.lang,
    exporting: {
      ...defaultOptions.exporting,
      buttons: {
        order: {
          symbol: rankingOrder ? 'triangle-down' : 'triangle',
          symbolFill: theme.text.primary,
          symbolStroke: theme.text.primary,
          symbolSize: 6,
          symbolY: 11.5,
          onclick() {
            setRankingOrder(!rankingOrder);
          },
          theme: {
            fill: 'transparent',
            states: {
              hover: {
                fill: theme.separator,
              },
              select: {
                fill: theme.separator,
              },
            },
          },
        },
        ...defaultOptions.exporting.buttons,
      },
    },
  };

  return (
    <div id="container" className={classes.wrapper}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        callback={(chart) => {
          setChartObj(chart);
        }}
      />
      <div className={classes.tooltip} style={{ right: 55, top: 7 }}>
        <CustomTooltip
          title={`${info} ${t(
            `dashboard.dataType.${data.dataType}`
          ).toLowerCase()}`}
          placement="bottom"
        >
          <InfoOutlined
            style={{
              color: theme.text.primary,
              fontSize: '15px',
            }}
          />
        </CustomTooltip>
      </div>
      <Pagination
        className={classes.pagination}
        size="small"
        count={totalPages}
        page={page}
        onChange={(event, value) => setRankingPage(value)}
      />
    </div>
  );
}
