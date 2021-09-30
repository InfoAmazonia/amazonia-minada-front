import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      color: theme.text.primary,
    },
    '& .MuiFormLabel-root': {
      color: theme.text.primary,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.text.primary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.text.tertiary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.text.secondary,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.text.secondary,
    },
    '& .MuiSelect-icon': {
      color: theme.text.primary,
    },
  },
  select: {
    '& .MuiSelect-select:focus': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        padding: '5px 14px',
      },
  },
  menuPopOver: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.primary,
      color: theme.text.primary,
    },
  },
}));

export default useStyles;
