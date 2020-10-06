import React from "react";

export default (attribute) => {
  let options;

  if (attribute.type === "1") {
    options = (
      <>
        <option value="0">No</option>
        <option value="1">Yes</option>
      </>
    );
  }

  if (attribute.type !== "1") {
    options = (
      <>
        {attribute.options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.option}
          </option>
        ))}
      </>
    );
  }

  return options;
};
