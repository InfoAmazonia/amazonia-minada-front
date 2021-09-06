/* eslint-disable no-nested-ternary */
import { useMediaQuery } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
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
}) {
  Ranking.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
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
        },
      },
      ...defaultOptions.chart,
    },
    credits: defaultOptions.credits,
    title: {
      text: title,
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
      width: isXsm ? '50%' : isSm ? '70%' : isSmd ? '80%' : '70%',
    },
    legend: defaultOptions.legend,
    tooltip: {
      useHTML: true,
      formatter() {
        return `<b>${this.point.category}</b> </br>
            <tr><td style="color: ${this.series.color}">${
          this.series.name
        }: </td>
              <td style="text-align: right"><b>${t('general.roundNumber', {
                value: this.point.y,
              })} ha
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
          color: theme.text.tertiary,
          enabled: true,
          style: {
            textOutline: false,
            fontSize: '11px',
            fontWeight: 500,
            /* ...defaultOptions.series.dataLabels.style, */
          },
          formatter() {
            if (data.values) {
              if (this.point.series.index === 0) {
                return `${t('general.roundNumber', {
                  value: data.values[this.point.index],
                })} ha`;
              }
              return '';
            }
            return `${t('general.roundNumber', {
              value: this.total,
            })} ha`;
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
        <CustomTooltip title={info} placement="bottom">
          <InfoOutlined
            style={{
              color: theme.text.primary,
              fontSize: '15px',
            }}
          />
        </CustomTooltip>
      </div>
    </div>
  );
}
