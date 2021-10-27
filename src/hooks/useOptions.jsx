import Highcharts from 'highcharts';
import dataExporting from 'highcharts/modules/export-data';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

dataExporting(Highcharts);

/**
 * This hook provides the highcharts default options.
 */
export default function useOptions() {
  const theme = useTheme();
  const { t } = useTranslation();

  Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
    const path = [
      // Arrow stem
      'M',
      x + w * 0.5,
      y,
      'L',
      x + w * 0.5,
      y + h * 0.7,
      // Arrow head
      'M',
      x + w * 0.3,
      y + h * 0.5,
      'L',
      x + w * 0.5,
      y + h * 0.7,
      'L',
      x + w * 0.7,
      y + h * 0.5,
      // Box
      'M',
      x,
      y + h * 0.9,
      'L',
      x,
      y + h,
      'L',
      x + w,
      y + h,
      'L',
      x + w,
      y + h * 0.9,
    ];
    return path;
  };

  const defaultOptions = {
    chart: {
      backgroundColor: 'transparent',
      spacing: [3, 0, 15, 0],
      height: '250px',
      zoomType: 'x',
    },
    credits: {
      enabled: false,
    },
    title: {
      align: 'left',
      style: {
        fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '19.12px',
        letterSpacing: '-0.00833em',
        color: theme.text.primary,
      },
    },
    xAxis: {
      zoomEnabled: false,
      allowDecimals: true,
      gridLineWidth: 0.5,
      gridLineColor: theme.separator,
      labels: {
        style: {
          fontWeight: 500,
          fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
          color: theme.text.tertiary,
        },
      },
    },
    yAxis: {
      zoomEnabled: false,
      title: {
        enabled: true,
        text: t('dashboard.infoPanel.statistics.charts.thousandHectares'),
      },
      labels: {
        formatter() {
          return `${t('general.roundNumber', {
            value: this.value / 1000,
          })}`;
        },
        style: {
          fontSize: '10px',
          fontWeight: 500,
          fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
          color: theme.text.tertiary,
        },
      },
      gridLineWidth: 0.5,
      gridLineColor: theme.separator,
    },
    series: {
      dataLabels: {
        style: {
          fontWeight: 500,
          fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
        },
      },
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: theme.text.secondary,
        fontWeight: 500,
        fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
      },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    lang: {
      contextButtonTitle: t('dashboard.infoPanel.statistics.charts.export'),
    },
    navigation: {
      menuStyle: {
        background: theme.background.primary,
        border: 'none',
        boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.2)',
      },
      menuItemStyle: { color: theme.text.primary },
      menuItemHoverStyle: { background: theme.separator },
    },
    exporting: {
      enabled: true,
      csv: {
        itemDelimiter: ',',
        lineDelimiter: '\n',
        decimalPoint: '.',
        columnHeaderFormatter(item /* key */) {
          if (item) {
            return item.name ? item.name : '';
          }
          return 'Dado';
        },
      },
      chartOptions: {
        chart: {
          events: null,
          style: {
            backgroundColor: theme.background.primary,
          },
        },
      },
      menuItemDefinitions: {
        downloadPNG: {
          text: `${t(
            'dashboard.infoPanel.statistics.charts.printButton'
          )} .png`,
        },
        downloadJPEG: {
          text: `${t(
            'dashboard.infoPanel.statistics.charts.printButton'
          )} .jpeg`,
        },
        downloadPDF: {
          text: `${t(
            'dashboard.infoPanel.statistics.charts.printButton'
          )} .pdf`,
        },
        downloadSVG: {
          text: `${t(
            'dashboard.infoPanel.statistics.charts.printButton'
          )} .svg`,
        },
        downloadCSV: {
          text: `${t(
            'dashboard.infoPanel.statistics.charts.printButton'
          )} .csv`,
          onclick() {
            this.downloadCSV();
          },
        },
      },
      buttons: {
        contextButton: {
          symbol: 'download',
          symbolSize: 11,
          symbolFill: theme.text.primary,
          symbolStroke: theme.text.primary,
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
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
            'downloadCSV',
          ],
        },
        infoButton: {
          symbol: '',
          symbolFill: theme.text.primary,
          symbolStroke: theme.text.primary,
          theme: {
            fill: 'transparent',
            style: { cursor: 'default' },
            states: {
              hover: {
                fill: theme.background.primary,
              },
              select: {
                fill: theme.separator,
              },
            },
          },
          onclick() {},
        },
      },
    },
  };

  return defaultOptions;
}
