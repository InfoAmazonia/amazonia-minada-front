import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    borderRadius: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  button: {
    '&.MuiButtonBase-root': {
      borderRadius: 5,
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
  n: {},
}));

export default useStyles;
