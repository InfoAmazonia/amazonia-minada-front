/**
 * This file defines constants to be used on styles.
 */

export const sizes = {
};

export const transitions = {
  background: 'all 0.3s ease',
};

export const styles = (theme) => ({
  button: {
    '&.MuiButton-root': {
      textTransform: 'none',

      '&:hover': {
        backgroundColor: theme.background.secondary,
      },
      '&:active': {
        backgroundColor: theme.hover,
        transition: 'background-color 0.15s ease',
        cursor: 'pointer',
      },
      '& .MuiTouchRipple-root span': {
        display: 'none',
      },
    },
  },
});

export const breakpoints = {
  min: {
    xsm: '@media (min-width: 401px)',
    sm: '@media (min-width: 601px)',
    smd: '@media (min-width: 801px)',
    md: '@media (min-width: 901px)',
    lg: '@media (min-width: 1281px)',
  },
  max: {
    xsm: '@media (max-width: 400px)',
    sm: '@media (max-width: 600px)',
    smd: '@media (max-width: 800px)',
    md: '@media (max-width: 900px)',
    lg: '@media (max-width: 1280px)',
  },
};
