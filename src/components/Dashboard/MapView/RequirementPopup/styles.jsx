import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  popup: {
    '& .mapboxgl-popup-content': {
      backgroundColor: theme.background.primary,
      borderRadius: 10,
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)',
      color: theme.text.primary,
      minWidth: 120,
      maxWidth: 250,

      '& .mapboxgl-popup-close-button': {
        marginRight: 5,
      },
    },
    '& .mapboxgl-popup-tip': {
      borderTopColor: theme.background.primary,
      borderBottomColor: theme.background.primary,
    },
  },
  separator: {
    width: '100%',
    height: 1,
    margin: '5px 0px',
    backgroundColor: theme.separator,
  },
}));

export default useStyles;
