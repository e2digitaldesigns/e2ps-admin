import _ from 'lodash';
import uniqid from 'uniqid';

export const newAttribute = () => {
  return {
    _id: uniqid('', '_attribute'),
    system: false,
    isActive: false,
    order: 0,
    name: 'New Attribute',
    type: '1',
    options: [_.cloneDeep(newAttributeOption())],
    tempName: 'New Attribute',
  };
};

export const newAttributeOption = () => {
  return {
    _id: uniqid('', '_attrOption'),
    option: '',
    order: 1,
    days: 1,
    gsm: '',
    setUpPrice: '10',
    minPrice: '10',
    price: '10',
  };
};
