import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  container: {
    width: 115,
    height: 25,
    userSelect: 'none',

    '@media (max-width: 990px)': {
      width: 25,
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
    objectPosition: 'left',
  },
}));

export default useStyles;
