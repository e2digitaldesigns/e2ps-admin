import _ from 'lodash';

export default (productState, stateType = 'new') => {
  // console.clear();
  const state = _.cloneDeep(productState);

  console.log(7, state);

  let thisAttrPrice,
    thisAttrDays,
    attrPrice = 0,
    attrDays = 0,
    attrWeight = 0,
    temp = [];

  //////////////////////////////////////////////////
  const size =
    stateType === 'new'
      ? state.listing[state.activeProductIndex].productSizes[
          state.activeProductSizeIndex
        ]
      : productState.productSizes;

  //////////////////////////////////////////////////

  if (state.itemType === 'design') {
    return {
      basePrice: 0,
      attributePrice: 0,
      itemPrice:
        state.activeProductSides === '1'
          ? parseFloat(size.designPrice1)
          : parseFloat(size.designPrice2),
      turnTime: 0,
      shipping: { weight: 0 },
    };
  }

  //////////////////////////////////////////////////
  const quantities =
    stateType === 'new'
      ? size.quantities[state.activeProductQuantityIndex]
      : size.quantities.find((f) => f._id === state.activeProductQuantityId);
  //////////////////////////////////////////////////

  const basePrice =
    parseInt(state.activeProductSides) === 2
      ? quantities.price2
      : quantities.price1;
  const quantity = quantities.quantity;

  //////////////////////////////////////////////////
  const attributes =
    stateType === 'new'
      ? state.listing[state.activeProductIndex].attributes
      : state.attributes;
  //////////////////////////////////////////////////
  let selectedOptionIndex, thisOption;

  for (let i = 0; i < attributes.length; i++) {
    selectedOptionIndex = state.selectedAttributes[i].optionIndex;

    if (attributes[i].type !== '1') {
      thisOption = attributes[i].options[selectedOptionIndex];
    }

    // console.log("xxxxxxxxxxxxxxxxxxxx", attributes[i]);

    switch (attributes[i].type) {
      case '0':
        thisAttrPrice = (parseFloat(thisOption.price) / 100) * basePrice;
        thisAttrDays = parseFloat(thisOption.days);

        // console.log(69, thisOption.gsm);

        if (attributes[i].system === true) {
          attrWeight = calculateWeight(thisOption.gsm, size.size, quantity);
        }
        break;

      case '1':
        if (selectedOptionIndex === '1') {
          thisOption = attributes[i].options[0];
          temp[0] = parseFloat(thisOption.minPrice);
          temp[1] =
            parseFloat(thisOption.setUpPrice) +
            parseFloat(thisOption.price) * Math.ceil(quantity / 100);
          temp[2] = temp[0] > temp[1] ? temp[0] : temp[1];
          thisAttrPrice = temp[2];
          thisAttrDays = parseFloat(thisOption.days);
        }
        break;

      case '2':
        thisAttrPrice =
          parseFloat(thisOption.setUpPrice) + parseFloat(thisOption.price);
        thisAttrDays = parseFloat(thisOption.days);
        break;

      case '3':
        thisAttrPrice =
          parseFloat(thisOption.price) * Math.ceil(quantity / 100);
        thisAttrDays = parseFloat(thisOption.days);
        break;

      case '4':
        thisAttrPrice = (parseFloat(thisOption.price) / 100) * basePrice;
        thisAttrDays = parseFloat(thisOption.days);
        break;

      case '5':
        temp[0] = parseFloat(thisOption.minPrice);
        temp[1] =
          parseFloat(thisOption.setUpPrice) +
          parseFloat(thisOption.price) * Math.ceil(quantity / 100);
        temp[2] = temp[0] > temp[1] ? temp[0] : temp[1];
        thisAttrPrice = temp[2];
        thisAttrDays = parseFloat(thisOption.days);
        break;

      default:
        break;
    }

    attrPrice += thisAttrPrice;
    attrDays += thisAttrDays;
  }

  return {
    basePrice,
    attributePrice: attrPrice,
    itemPrice: parseFloat(basePrice) + parseFloat(attrPrice),
    turnTime: attrDays,
    shipping: { weight: attrWeight },
  };
};

function calculateWeight(gsm, size, quantity) {
  const psm = gsm * 0.00220462;
  const psi = psm / 1550;
  const dims = size.split('x');
  const sqInches = parseFloat(dims[0]) * parseFloat(dims[1]);
  const weight = psi * sqInches * quantity;
  const theWeight = weight < 2 ? 2 : weight;
  return theWeight.toFixed(2);
}
