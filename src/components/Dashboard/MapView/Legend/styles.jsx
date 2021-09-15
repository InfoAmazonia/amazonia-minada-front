import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    borderRadius: 5,
    width: 40,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
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
}));

export default useStyles;
