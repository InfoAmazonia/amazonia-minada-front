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
    zIndex: 10,
    position: 'absolute',
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
}));

export default useStyles;
