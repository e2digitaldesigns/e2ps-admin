import React from 'react';

export default ({ orderId, data }) => {
  return (
    <span
      id={`createPrintOrder-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      <span>createPrintOrder coming soon</span>
    </span>
  );
};
