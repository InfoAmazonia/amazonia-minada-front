import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: sizes.infoBarWidth,
    zIndex: 1000,
    boxShadow: theme.defaultShadow,
    backgroundColor: theme.background.primary,

    [breakpoints.max.sm]: {
      width: '100%',
      marginTop: -61 - sizes.infoBarHeaderHeight,
    },
  },
  tab: {
    position: 'relative',
    width: '100%',
    paddingLeft: sizes.infoBarSidePadding,
    paddingRight: sizes.infoBarSidePadding,

    '& .MuiTab-root': {
      textTransform: 'none',
    },
  },
  tabFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '2px',
    backgroundColor: theme.grey,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [breakpoints.max.sm]: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
  },
}));

export default useStyles;
