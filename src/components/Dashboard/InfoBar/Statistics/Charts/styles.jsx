import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
  },
  tooltip: { position: 'absolute', right: 30, top: 5, cursor: 'pointer' },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: theme.primary,
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.primary,
      color: theme.background.primary,
    },
    '& .MuiPaginationItem-page.Mui-selected:hover': {
      backgroundColor: theme.primary,
    },
  },
}));

export default useStyles;
