import React from 'react';

export default ({ orderId, data }) => {
  return (
    <span
      id={`designer-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      <span> designer coming soon</span>
    </span>
  );
};
