import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButtonBase-root': {
      borderRadius: 5,
      minWidth: 40,
      maxWidth: 40,
      minHeight: 40,
      maxHeight: 40,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  },
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
  },
  shareButton: {
    transition: 'all 0.3s ease',

    '&.MuiButton-root': {
      minWidth: 34,
      minHeight: 30,
      maxWidth: 34,
      maxHeight: 30,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  },
  copyWrapper: {
    margin: '15px 0px 0px 0px',
    display: 'flex',
  },
  optionsWrapper: {
    margin: '15px 0px 15px 0px',
    display: 'flex',
  },
  textfieldRoot: {
    width: '100%',

    '& .MuiFormLabel-root': {
      color: theme.text.gray,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
    },
    '& .MuiIconButton-root': {
      color: theme.text.primary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.text.secondary,
      transition: 'border-color .2s ease',
    },
    '& .MuiOutlinedInput-root:hover': {
      transition: 'background-color 0.15s ease',
      borderColor: theme.text.primary,
      backgroundColor: theme.background.secondary,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.text.primary,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.primary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.primary,
    },
    '& .MuiInputBase-input': {
      color: theme.text.primary,
    },
    '& .MuiAutocomplete-popupIndicatorOpen': {
      transform: 'rotate(0deg)',
    },
  },
  copyButton: {
    '&.MuiButton-root': {
      minWidth: 120,
      maxWidth: 120,
      backgroundColor: theme.button.primary,
      color: theme.text.primary,
      marginLeft: 10,
      textTransform: 'none',

      '&:hover': {
        backgroundColor: theme.button.primaryHover,
      },
    },
  },
  bottomContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  comeBackButton: {
    '&.MuiButtonBase-root': {
      borderRadius: 5,
      minWidth: 0,
      maxWidth: '100%',
      minHeight: 40,
      maxHeight: 40,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      marginTop: 10,
      padding: '0px 0px 0px 10px',
    },
  },
  formGroup: {
    width: '50%',
  },
  formLabelChecked: {
    color: theme.text.primary,
  },
  formLabelDisabled: {
    color: theme.text.secondary,
  },
}));

export default useStyles;
