import { createUseStyles } from 'react-jss';

import { breakpoints } from '../../../../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statisticItems: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',

    [breakpoints.max.smd]: {
      width: '100%',
      justifyContent: 'space-around',
    },
  },
  statisticItem: {
    width: '140px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
