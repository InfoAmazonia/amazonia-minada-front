import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',

    [breakpoints.max.smd]: {
      height: `calc(100% - ${61 + sizes.infoBarHeaderHeight}px)`,
    },
  },
  wrapperWithoutSm: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  options: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',

    '& > *': {
      marginRight: 10,
    },
    '& div:last-child': {
      marginRight: 0,
    },
    [breakpoints.max.smd]: {
      left: 15,
      right: 15,
      transform: 'translateX(0px)',
    },
  },
  legendContainerExpanded: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,

    '& > *': {
      marginBottom: 10,
    },
    '& div:last-child': {
      marginBottom: 0,
    },
    [breakpoints.max.md]: {
      position: 'absolute',
      zIndex: 10,
      top: '50%',
      right: 15,
      transform: 'translateY(-50%)',
    },
  },
  refs: {
    bottom: 7,
    display: 'flex',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
    justifyContent: 'center',

    '& > *': {
      marginRight: 20,
    },
    '& div:last-child': {
      marginRight: 0,
    },
    '@media (max-width: 980px)': {
      bottom: 25,
    },
    '@media (max-width: 640px)': {
      bottom: 7,
    },
  },
  refsLeft: {
    bottom: 7,
    display: 'flex',
    position: 'absolute',
    left: 100,
    alignItems: 'center',
    justifyContent: 'center',

    '& > *': {
      marginRight: 20,
    },
    '& div:last-child': {
      marginRight: 0,
    },
  },
}));

export default useStyles;
