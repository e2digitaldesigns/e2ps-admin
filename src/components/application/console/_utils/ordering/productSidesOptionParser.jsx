import React from "react";

export default (data) => {
  let options = "";

  if (data.activeProductSidesCode === "1") {
    options = <option value="1">Single-Sided</option>;
  } else if (data.activeProductSidesCode === "2") {
    options = (
      <>
        <option value="1">Single-Sided</option>
        <option value="2">Double-Sided</option>
      </>
    );
  } else {
    options = <option value="2">Double-Sided</option>;
  }

  return options;
};
