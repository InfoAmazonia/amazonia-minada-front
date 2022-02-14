import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    [breakpoints.max.smd]: {
      flexDirection: 'column-reverse',
      position: 'relative',
      flexWrap: 'nowrap',
      /*       overflow: 'hidden', */
    },
  },
  mapWrapper: {
    width: '100%',
    height: '100%',
    zIndex: 0,

    [breakpoints.max.smd]: {
      height: '100vh',
      marginTop: -(sizes.infoBarHeaderHeight + 61),
    },
  },
}));

export default useStyles;
