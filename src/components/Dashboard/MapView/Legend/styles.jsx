import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
  },
  buttonContainer: {
    backgroundColor: theme.background.primary,
    borderRadius: 5,
    width: 40,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    zIndex: 10,
  },
  closeButtonContainer: {
    width: 40,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    zIndex: 10,
  },
  firstCircle: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 22,
    height: 22,
    borderRadius: 20,
    backgroundColor: theme.territorialUnits.protectedArea,
    padding: 1,
  },
  secondCircle: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: theme.miningProcesses.miningConcession,
    padding: 1,
  },
  thirdCircle: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 13,
    height: 13,
    borderRadius: 20,
    backgroundColor: theme.territorialUnits.indigenousLand,
    padding: 1,
  },
  fourthCircle: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: theme.miningProcesses.miningResearchRequest,
    padding: 1,
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
      padding: 0,
      zIndex: 10,
    },
  },
  openedContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.background.primary,
    padding: '10px 15px',
    borderRadius: 5,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.defaultShadow,
    zIndex: 0,
  },
  title: {
    marginBottom: 5,

    '&:first-of-type': {
      paddingRight: 35,
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',

    '&:not(:first-of-type)': {
      marginTop: 10,
    },
  },
  circle: {
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: 100,
  },
}));

export default useStyles;
