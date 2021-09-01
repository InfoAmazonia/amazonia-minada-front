/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';
import { breakpoints, sizes } from '../../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    width: sizes.infoBarWidth,
    backgroundColor: theme.background.primary,

    [breakpoints.max.sm]: {
      width: '100%',
      height: '800px',
      marginTop: -61 - sizes.infoBarHeaderHeight,
    },
  },
}));

export default useStyles;
