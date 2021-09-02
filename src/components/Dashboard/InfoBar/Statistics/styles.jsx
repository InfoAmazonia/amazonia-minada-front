import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  generalStatistics: {
    height: '150px',
    borderBottom: '1px solid',
    borderBottomColor: theme.separator,
  },
  chart: {
    height: '250px',
    borderBottom: '1px solid',
    borderBottomColor: theme.separator,
  },
}));

export default useStyles;
