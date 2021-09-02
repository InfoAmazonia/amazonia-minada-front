import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  generalStatistics: {
    height: '150px',
    borderBottom: '1px solid grey',
  },
  chart: {
    height: '250px',
    borderBottom: '1px solid grey',
  },
}));

export default useStyles;
