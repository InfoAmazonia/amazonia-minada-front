import { createUseStyles } from 'react-jss';

import { styles } from '../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButton-root': {
      minWidth: 0,
      ...styles(theme).button,
    },
  },
}));

export default useStyles;
