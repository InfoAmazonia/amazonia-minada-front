import { Typography } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'react-jss';
import PropTypes from 'prop-types';
import useStyles from './styles';

/**
 * This component represents a list item.
 */
export default function ListItem({ circleColor, title, infos }) {
  ListItem.propTypes = {
    circleColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    infos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <div
          className={classes.circle}
          style={{ backgroundColor: circleColor }}
        />
        <Typography
          style={{ color: theme.text.primary, fontSize: 14 }}
          variant="overline"
        >
          {title}
        </Typography>
      </div>
      {infos && (
        <div className={classes.infos}>
          {infos.map((info) => (
            <div key={info.title} className={classes.infoItem}>
              <Typography
                style={{ color: theme.text.secondary }}
                variant="caption"
              >
                {info.title}
              </Typography>
              <Typography style={{ color: theme.text.primary }} variant="body1">
                {info.data}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
