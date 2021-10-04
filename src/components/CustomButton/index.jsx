import PropTypes from 'prop-types';
import React from 'react';

export default function CustomButton({ className, children, handleOnClick }) {
  CustomButton.defaultProps = {
    className: '',
  };

  CustomButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    handleOnClick: PropTypes.func.isRequired,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleOnClick()}
      onKeyDown={() => handleOnClick()}
      className={className}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
