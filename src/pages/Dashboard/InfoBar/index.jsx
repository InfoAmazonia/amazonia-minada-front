/* eslint-disable react/forbid-prop-types */
import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import TabPanel from '../../../components/Dashboard/InfoBar/TabPanel';
import List from './List';
import Statistics from './Statistics';
import useStyles from './styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InfoBar() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.wrapper}>
      <Tabs
        className={classes.tab}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        aria-label="simple tabs example"
        variant="fullWidth"
      >
        <Tab label="Estatísticas" {...a11yProps(0)} />
        <Tab label="Listagem" {...a11yProps(1)} />
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
