export default (data, theSizeIndex = null, theQuantityIndex = null) => {
  const sizeIndex = theSizeIndex === null ? 0 : theSizeIndex;
  const sizeId = data.productSizes[sizeIndex]._id;
  const quantityIndex = theQuantityIndex === null ? 0 : theQuantityIndex;
  const quantityId = data.productSizes[sizeIndex].quantities[quantityIndex]._id;
  const quantity = data.productSizes[sizeIndex].quantities[quantityIndex];
  const attributes = data.attributes.filter((f) => f.isActive === true);
  const selectedAttributes = [];

  const obj = {
    activeProductId: data._id,
    activeProductSizeIndex: sizeIndex,
    activeProductSizeId: sizeId,
    activeProductQuantityIndex: quantityIndex,
    activeProductQuantityId: quantityId,
    activeProductSidesCode: quantity.sides,
    activeProductSides: quantity.sides === '_2' ? '2' : '1',
    basePrice: quantity.sides === '_2' ? quantity.price2 : quantity.price1,
  };

  for (let i = 0; i < attributes.length; i++) {
    selectedAttributes.push({
      attrIndex: i,
      attrId: attributes[i]._id,
      optionIndex: 0,
      optionId: attributes[i].options[0]._id,
    });
  }

  obj.selectedAttributes = selectedAttributes;
  return obj;
};
