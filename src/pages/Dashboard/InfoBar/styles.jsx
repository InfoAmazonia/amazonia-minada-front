import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: sizes.infoBarWidth,
    minWidth: sizes.infoBarWidth,
    maxWidth: sizes.infoBarWidth,
    zIndex: 10,
    boxShadow: theme.defaultShadow,
    backgroundColor: theme.background.primary,

    [breakpoints.max.sm]: {
      width: '100%',
      minWidth: 'initial',
      maxWidth: 'initial',
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
    padding: 20,

    [breakpoints.max.sm]: {
      display: 'none',
    },
  },
  mobileSearchContainer: {
    display: 'none',

    [breakpoints.max.sm]: {
      display: 'block',
      position: 'absolute',
      padding: 20,
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
    },
  },
  minimizeWrapper: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    width: 40,
    height: 40,
    borderRadius: '0px 5px 5px 0px',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    right: -40,
    zIndex: 10,
    top: '50%',
  },
  minimizeButton: {
    '&.MuiButtonBase-root': {
      borderRadius: '0px 5px 5px 0px',
      minWidth: 40,
      maxWidth: 40,
      minHeight: 40,
      maxHeight: 40,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  },
  icon: {
    color: theme.text.primary,
  },
}));

export default useStyles;
