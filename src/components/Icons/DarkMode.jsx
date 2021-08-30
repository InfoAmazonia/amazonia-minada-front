/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

function SvgDarkMode(props) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.2 15.6C4 15.6.6 12.2.6 8 .6 3.8 3.9.5 8 .4c.2 0 .4.1.5.3.1.2.1.4-.1.5-.8 1-1.3 2.2-1.3 3.5 0 3.1 2.5 5.6 5.6 5.6.7 0 1.3-.1 1.9-.3.2-.1.4 0 .5.1.1.1.2.3.1.5-1 3-3.8 5-7 5zM7 1.5C3.9 2 1.6 4.7 1.6 8c0 3.6 3 6.6 6.6 6.6 2.4 0 4.6-1.3 5.7-3.3-.4.1-.8.1-1.2.1-3.7 0-6.6-3-6.6-6.6.1-1.2.4-2.3.9-3.3z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgDarkMode;
