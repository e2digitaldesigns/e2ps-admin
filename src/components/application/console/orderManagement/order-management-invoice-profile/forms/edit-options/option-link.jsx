import React from "react";

export default ({ menuState, handleClick, name, display, count = null }) => {
  return (
    <>
      <span
        className={`invoice-option-link ${
          menuState[name] && "invoice-option-link-active"
        }`}
        onClick={() => handleClick(name)}
      >
        {display}
        {count !== null && <> ({count})</>}
      </span>
    </>
  );
};
