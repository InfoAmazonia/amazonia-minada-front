import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  buttonContainer: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    borderRadius: 5,
    width: 40,
    height: 40,
    position: 'relative',
    display: 'flex',
    userSelect: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0px',
  },
  whatsappIcon: {
    '& path': {
      fill: theme.share.whatsapp,
    },
  },
  facebookIcon: {
    '& path': {
      fill: theme.share.facebook,
    },
  },
  twitterIcon: {
    '& path': {
      fill: theme.share.twitter,
    },
  },
  copyWrapper: {
    margin: '15px 0px 0px 0px',
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
}));

export default useStyles;
