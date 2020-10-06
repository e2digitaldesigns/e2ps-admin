import React from 'react';

export default ({ orderId, data }) => {
  return (
    <span
      id={`assignToPrintOrder-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      <span>assignToPrintOrder coming soon</span>
    </span>
  );
};
