import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  arrow: {
    '&.MuiTooltip-arrow': {
      color: theme.tooltip.background,
    },
  },
  tooltip: {
    '&.MuiTooltip-tooltip': {
      fontSize: 10,
      fontWeight: 700,
      lineHeight: '13,66px',
      display: 'flex',
      alignItems: 'center',
      minHeight: 32,
      backgroundColor: theme.tooltip.background,
      color: theme.tooltip.text,
    },
  },
}));

export default useStyles;
