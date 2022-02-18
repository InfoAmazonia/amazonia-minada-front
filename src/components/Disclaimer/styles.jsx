import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.primary,
      width: '100%',
      maxWidth: 450,
    },
  },
  header: {
    minHeight: 47,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 15px',
    justifyContent: 'space-between',
    position: 'relative',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.separator,
    height: 1,
    width: '100%',
  },
  content: {
    padding: 15,
    overflow: 'auto',
  },
  accessButton: {
    '&.MuiButton-root': {
      width: '100%',
      backgroundColor: theme.button.primary,
      color: theme.text.primary,
      textTransform: 'none',

      '&:hover': {
        backgroundColor: theme.button.primaryHover,
      },
    },
  },
}));

export default useStyles;
