import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Legend from '../../../../components/Dashboard/InfoBar/Statistics/Charts/Legend';
import SemiCircle from '../../../../components/Dashboard/InfoBar/Statistics/Charts/SemiCircle';
import GeneralStatistics from '../../../../components/Dashboard/InfoBar/Statistics/GeneralStatistics';

/**
 *  This function returns statistics content.
 */
export default function Statistics() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [semiCircleData, setSemiCircleData] = useState();

  useEffect(() => {
    const data = [
      { name: 'indigenousLand', data: 62070.621 },
      { name: 'protectedArea', data: 86898.87 },
    ];
    data.map((obj) => {
      obj.color = theme.territorialUnits[obj.name];
      obj.y = obj.data;
      delete obj.data;
      obj.id = obj.name;
      obj.name = t(`dashboard.dataType.territorialUnits.${obj.name}.singular`);
      return obj;
    });
    setSemiCircleData(data);
  }, []);

  return useMemo(
    () => (
      <>
        <GeneralStatistics />
        <SemiCircle
          data={semiCircleData}
          title={t(`dashboard.infoPanel.statistics.charts.semiCircle.title`)}
          info={t(`dashboard.infoPanel.statistics.charts.semiCircle.info`)}
        />
        <Legend data={semiCircleData} />
      </>
    ),
    [semiCircleData]
  );
}
