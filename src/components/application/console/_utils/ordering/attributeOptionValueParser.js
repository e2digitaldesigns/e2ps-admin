export default (data, id) => {
  const option = data.selectedAttributes.find((f) => f.attrId === id);
  if (option && option.optionId) {
    return option.optionId;
  } else {
  }
};
