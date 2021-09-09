import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',

    [breakpoints.max.sm]: {
      height: `calc(100% - ${61 + sizes.infoBarHeaderHeight}px)`,
    },
  },
  navigation: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 15,
    transform: 'translateY(-50%)',

    '& > *': {
      marginBottom: 10,
    },
    '& div:last-child': {
      marginBottom: 0,
    },
  },
  options: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: '50%',
    transform: 'translateX(-50%)',

    '& > *': {
      marginRight: 10,
    },
    '& div:last-child': {
      marginRight: 0,
    },
    [breakpoints.max.sm]: {
      top: 15 + 58 + 15,
    },
  },
}));

export default useStyles;
