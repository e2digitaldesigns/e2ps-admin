import _ from 'lodash';

export default (theData) => {
  const data = _.cloneDeep(theData);

  for (let productIndex = 0; productIndex < data.length; productIndex++) {
    data[productIndex].productSizes = data[productIndex].productSizes.filter(
      (f) =>
        f.isActive === true &&
        f.quantities.filter((m) => m.isActive === true).length > 0,
    );

    data[productIndex].attributes = data[productIndex].attributes.filter(
      (f) => f.isActive === true && f.options.length > 0,
    );

    for (
      let sizeIndex = 0;
      sizeIndex < data[productIndex].productSizes.length;
      sizeIndex++
    ) {
      data[productIndex].productSizes[sizeIndex].quantities = data[
        productIndex
      ].productSizes[sizeIndex].quantities.filter((f) => f.isActive === true);
    }
  }

  return data;
};
