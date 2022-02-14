import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  container: {
    width: 150,
    height: 22,
    userSelect: 'none',

    '@media (max-width: 1050px)': {
      width: 30,
    },
    '&::after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
    },
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'right',
  },
}));

export default useStyles;
