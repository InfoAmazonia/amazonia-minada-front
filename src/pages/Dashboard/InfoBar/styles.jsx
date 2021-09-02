/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';
import { breakpoints, sizes } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    paddingTop: 60,
    flexFlow: "column nowrap",
    width: sizes.infoBarWidth,
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
  },
  tabFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '2px',
    backgroundColor: theme.grey,
  },
}));

export default useStyles;
