import { createUseStyles } from 'react-jss';

import { breakpoints } from '../../../../../../constants/constraints';

const useStyles = createUseStyles(() => ({
  innerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
  },
  line: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    cursor: 'pointer',
    width: 150,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'space-between',

    [breakpoints.max.smd]: {
      width: 170,
    },
  },
  columnLegendItem: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  circle: {
    minWidth: 14,
    height: 14,
    marginTop: 2,
    marginRight: 8,
    borderRadius: '100%',
  },
}));

export default useStyles;
