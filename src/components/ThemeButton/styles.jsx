import { createUseStyles } from 'react-jss';
import { styles } from '../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButton-root': {
      minWidth: 0,
      ...styles(theme).button,
    },
  },
  darkIcon: {
    height: 16,
    transform: 'scale(1)',
    margin: '0px -1px',

    '& path': {
      fill: theme.text.primary,
    },
  },
  lightIcon: {
    height: 16,
    transform: 'scale(1.2)',

    '& path': {
      fill: theme.text.primary,
    },
  },
}));

export default useStyles;
