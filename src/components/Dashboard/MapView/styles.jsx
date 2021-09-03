import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    [breakpoints.max.sm]: {
      height: `calc(100% - ${61 + sizes.infoBarHeaderHeight}px)`,
    },
  },
  geodatinContainer: {
    position: 'absolute',
    bottom: 7,
    width: 115,
    height: 25,
    left: '50%',
    transform: 'translateX(-50%)',
    userSelect: 'none',

    '@media (max-width: 700px)': {
      width: 25,
    },
    '@media (max-width: 600px)': {
      width: 115,
    },
    '@media (max-width: 320px)': {
      width: 25,
    },
    '&::after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
    },
  },
  geodatinLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left',
  },
}));

export default useStyles;
