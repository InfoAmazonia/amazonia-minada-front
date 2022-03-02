import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  container: {
    width: 108,
    height: 22,
    userSelect: 'none',

    '@media (max-width: 1100px)': {
      width: 21,
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
