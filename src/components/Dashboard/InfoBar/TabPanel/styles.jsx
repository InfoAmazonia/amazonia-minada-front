import { createUseStyles } from 'react-jss';
import { sizes } from '../../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    width: '100%',
    overflow: 'auto',
    paddingLeft: sizes.infoBarSidePadding,
    paddingRight: sizes.infoBarSidePadding,

    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.background.secondary,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.grey,
      borderRadius: 10,
    },
  },
}));

export default useStyles;
