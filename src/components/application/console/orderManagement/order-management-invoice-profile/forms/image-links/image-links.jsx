import React from "react";

export default ({ orderId, data }) => {
  return (
    <span
      id={`imageLinks-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      {!data.length && <li>No image links available</li>}

      {data.map((m, index) => (
        <li key={index}>
          <a href={m.link} target="_">
            Image {index + 1}
          </a>
        </li>
      ))}
    </span>
  );
};
