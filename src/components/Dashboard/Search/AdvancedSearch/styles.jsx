import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
    boxShadow: theme.defaultShadow,
    width: '100%',
    padding: '10px 0px',
    borderRadius: 5,
    backgroundColor: theme.background.primary,
  },
  dataTypeFilterSelector: { maxWidth: 120 },
  autocomplete: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]':
      {
        paddingRight: 95,
      },
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
        paddingRight: 40,
        width: '100%',
      },
  },
  popper: {
    '& .MuiPaper-root': {
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
  buttons: {
    position: 'absolute',
    top: 29,
    right: 10,
    transform: 'translateY(-50%)',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    fontSize: 5,
    '&.MuiIconButton-root': {
      color: theme.text.primary,
    },
  },
  separator: {
    width: 1,
    height: 30,
    margin: '0px 0px 0px 10px',
    backgroundColor: theme.separator,
  },
  searchIcon: {
    marginRight: 5,

    '&.MuiIconButton-root': {
      color: theme.text.primary,
    },
  },
  searchFooterWrapper: {
    padding: '0px 14px 0px 20px',
  },
  searchHeaderWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    paddingLeft: 20,
  },
  activeFilters: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  activeFiltersMinimized: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    overflow: 'hidden',
    margin: '5px 0px 5px 0px',

    '&::after': {
      content: '""',
      background: `linear-gradient(to right, transparent 5%, ${theme.background.primary} 40%, ${theme.background.primary}  100%)`,
      width: '80px',
      height: '100%',
      position: 'absolute',
      right: 0,
    },
  },
  filterIconWrapper: {
    maxWidth: 140,
    marginRight: 10,
    marginTop: 10,
    border: '0.5px solid gray',
    borderRadius: '20px',
  },
  filterIconWrapperMinimized: {
    maxWidth: 200,
    marginRight: 10,
    border: '0.5px solid gray',
    borderRadius: '20px',
  },
  filterIcon: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '0px 5px 0px 10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    cursor: 'pointer',
  },
  minimizeButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
}));

export default useStyles;
