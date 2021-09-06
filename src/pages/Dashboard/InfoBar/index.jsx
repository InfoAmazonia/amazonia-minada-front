import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TabPanel from '../../../components/Dashboard/InfoBar/TabPanel';
import SimpleSearch from '../../../components/Dashboard/Search/SimpleSearch';
import List from './List';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 *  This component provides the container for statistics and list.
 */
export default function InfoBar() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* This function returns a11y properties */
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchContainer}>
        <SimpleSearch />
      </div>
      <Tabs
        className={classes.tab}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        aria-label="simple tabs example"
        variant="fullWidth"
      >
        <Tab
          label={t('dashboard.infoPanel.statistics.title')}
          {...a11yProps(0)}
        />
        <Tab label={t('dashboard.infoPanel.list.title')} {...a11yProps(1)} />
        <div className={classes.tabFooter} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Statistics />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List />
      </TabPanel>
    </div>
  );
}
