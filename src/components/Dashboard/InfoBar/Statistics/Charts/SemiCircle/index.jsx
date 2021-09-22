/* eslint-disable no-unused-vars */
import { InfoOutlined } from '@mui/icons-material/';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import sankey from 'highcharts/modules/sankey';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import useOptions from '../../../../../../hooks/useOptions';
import CustomTooltip from '../../../../../CustomTooltip';
import useStyles from '../styles';

highchartsMore(Highcharts);
sankey(Highcharts);

export default function SemiCircle({ title, data, info }) {
  SemiCircle.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
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
  const defaultOptions = useOptions();
  const [chartObj, setChartObj] = useState();

  const options = {
    chart: {
      type: 'pie',
      ...defaultOptions.chart,
      height: 200,
    },
    credits: defaultOptions.credits,
    title: {
      text: title,
      ...defaultOptions.title,
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      useHTML: true,
      formatter() {
        return `${this.key}: <b>${this.percentage.toFixed(2)}%</b>`;
      },
    },
    series: [
      {
        data: data.series,
      },
    ],
    plotOptions: {
      pie: {
        innerSize: '50%',
        size: '200%',
        center: ['50%', '100%'],
        startAngle: -90,
        endAngle: 90,
        allowPointSelect: true,
        cursor: 'pointer',
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },
    navigation: defaultOptions.navigation,
    lang: defaultOptions.lang,
    exporting: defaultOptions.exporting,
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
      <div className={classes.tooltip}>
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
