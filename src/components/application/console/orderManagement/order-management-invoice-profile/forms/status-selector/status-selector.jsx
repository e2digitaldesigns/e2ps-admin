import React from 'react';

export default ({ assets, editOrderSegments }) => {
  const filterType = assets.itemType;

  const orderStatusMap = [
    { value: '_pending', display: 'Pending', type: '_b' },
    { value: '_need_files', display: 'Need Files', type: 'print' },
    { value: '_sent_to_print', display: 'Sent to Print', type: 'print' },
    { value: '_sent_to_design', display: 'Sent to Design', type: 'design' },
    { value: '_ready', display: 'Ready For Pick Up', type: '_b' },
    { value: '_picked_up', display: 'Picked Up', type: 'print' },
    { value: '_shipped', display: 'Shipped', type: 'print' },
    { value: '_approved', display: 'Approved', type: 'design' },
    { value: '_complete', display: 'Complete', type: '_b' },
  ];

  const filter = orderStatusMap.filter(
    (f) => f.type === filterType || f.type === '_b',
  );

  return (
    <>
      <select
        className="invoice-selects"
        name="status"
        value={assets.status}
        onChange={(e) => editOrderSegments(e)}
      >
        {filter.map((m, index) => (
          <option key={index} value={m.value}>
            {m.display}
          </option>
        ))}
      </select>
    </>
  );
};
