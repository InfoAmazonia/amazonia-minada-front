import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    borderRadius: 5,
    width: 40,
    height: 40,
    position: 'relative',
    display: 'flex',
    userSelect: 'none',
  },
  n: {
    position: 'absolute',
    left: '50%',
    top: 15,
    transform: 'translateX(-50%)',
  },
  upIcon: {
    position: 'absolute',
    left: '50%',
    top: 2,
    transform: 'translateX(-50%) scale(0.8)',
    color: theme.text.primary,
  },
}));

export default useStyles;
