import { createUseStyles } from 'react-jss';
import { breakpoints } from '../../constants/constraints';

const useStyles = createUseStyles((/* theme */) => ({
  wrapper: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    [breakpoints.max.sm]: {
      flexDirection: 'column-reverse',
      position: 'relative',
      flexWrap: 'nowrap',
    },
  },
  mapWrapper: {
    width: '100%',
    height: '100%',

    [breakpoints.max.sm]: {
      height: '100vh',
    },
  },
}));

export default useStyles;
