import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: `${theme.background.primary}50`,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    userSelect: 'none',
    pointerEvents: 'none',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
    transition: 'opacity 0.3s ease',
  },
  circularProgress: {
    marginBottom: 20,

    '&.MuiCircularProgress-root': {
      color: theme.primary,
    },
  },
}));

export default useStyles;
