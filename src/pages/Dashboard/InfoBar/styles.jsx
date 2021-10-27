import { createUseStyles } from 'react-jss';

import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    zIndex: 1000,
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: sizes.infoBarWidth,
    minWidth: sizes.infoBarWidth,
    maxWidth: sizes.infoBarWidth,
    zIndex: 100,
    boxShadow: theme.defaultShadow,
    backgroundColor: theme.background.primary,

    [breakpoints.max.smd]: {
      width: '100%',
      minWidth: 'initial',
      maxWidth: 'initial',
      marginTop: -61 - sizes.infoBarHeaderHeight,
    },
  },
  wrapperList: {
    '& > *:last-child': {
      borderBottom: 'none',
    },
  },
  wrapperStatistics: {
    '& > *:last-child': {
      marginBottom: 20,
    },
  },
  listHeader: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContent: {
    padding: 0,
    listStyleType: 'none',
  },
  listFooter: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0px 20px 0px',
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

    [breakpoints.max.smd]: {
      position: 'absolute',
      padding: 15,
      top: `calc(61px + ${sizes.infoBarHeaderHeight}px - 100vh)`,
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
  dropBar: {
    width: '100%',
    minHeight: 54,
    backgroundColor: theme.background.primary,
    borderBottom: `1px solid ${theme.separator}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    userSelect: 'none',

    [breakpoints.min.smd]: {
      display: 'none',
    },
  },
  arrowIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  statisticsLoading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
  },
}));

export default useStyles;
