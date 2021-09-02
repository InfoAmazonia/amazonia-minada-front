import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((/* theme */) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
