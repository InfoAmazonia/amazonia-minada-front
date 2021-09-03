import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    boxShadow: theme.defaultShadow,
    width: '100%',
    margin: 20,
    padding: '10px 27px',
    borderRadius: 5,
    backgroundColor: theme.background.primary,
  },
}));

export default useStyles;
