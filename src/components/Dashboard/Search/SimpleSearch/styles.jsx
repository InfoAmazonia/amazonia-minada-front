import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    boxShadow: theme.defaultShadow,
    width: '100%',
    margin: 20,
    padding: '10px 0px',
    borderRadius: 5,
    backgroundColor: theme.background.primary,
  },
  textfield: {
    '& .MuiInputBase-input': {
      padding: 10,
      paddingLeft: 30,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child':
      {
        paddingLeft: 15,
        width: '100%',
      },
  },
  popper: {
    '& .MuiPaper-root': {
      marginTop: 18,
      backgroundColor: theme.background.primary,
      color: theme.text.primary,
      borderRadius: 5,
      boxShadow: theme.defaultShadow,
    },
    '& .MuiAutocomplete-listbox': {
      paddingTop: 0,
      overflow: 'auto',

      '&::-webkit-scrollbar': {
        width: 8,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.background.secondary,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.grey,
        borderRadius: 10,
      },
    },
    '& .MuiListSubheader-sticky': {
      position: 'sticky',
      backgroundColor: theme.background.primary,
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
      backgroundColor: theme.button.focused,
      transition: 'background-color 0.2s ease',

      '&:active': {
        backgroundColor: theme.button.active,
      },
    },
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: theme.button.selected,

      '&:hover': {
        backgroundColor: theme.button.selectedHover,
      },
    },
  },
}));

export default useStyles;
