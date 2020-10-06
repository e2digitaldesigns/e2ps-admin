import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import AttributeHolder from '../utils/attributeHolder/attribute-holder';

import {
  getAttributesById,
  updateAttributes,
  deleteAttributes,
} from '../../../../../redux/actions/products/attributesActions';

import { newAttributeOption } from '../utils/attributeHolder/globalFunctions';
import { compareObjValues } from './../../../../../utils/applicationGlobals';

import {
  moneyValidate,
  alphaNumericValidate,
  numericValidate,
} from '../../_utils';

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await dispatch(getAttributesById(props.match.params.id));

        if (data.error.errorCode === '0x0') {
          const attribute = _.cloneDeep(data.attribute);
          attribute.options = attribute.options.sort(compareObjValues('order'));

          setState((state) => ({ attribute, temp: attribute }));
        }
      } catch (err) {
        console.log(21, 'cat pro', err);
      }
    }

    fetchData();
  }, [props.match.params.id, dispatch]);

  const handeDeleteAttribute = async () => {
    const result = await dispatch(deleteAttributes(state.attribute._id));
    if (result.error.errorCode === '0x0') {
      history.push('/console/product-management/attribute/listing');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateAttributes({ ...state.attribute }));

    if (result.error.errorCode === '0x0') {
      const attribute = _.cloneDeep(state.attribute);
      attribute.options = attribute.options.sort(compareObjValues('order'));
      setState({ attribute, temp: attribute });
      return;
    }
  };

  const handleFormChange = async (e) => {
    const attribute = _.cloneDeep(state.attribute);
    const { name, value } = e.target;

    // console.clear();
    // console.log(71, name, value);

    if (name === 'type' && attribute.options.length === 0) {
      attribute.options.push(_.cloneDeep(newAttributeOption()));
    }

    attribute[name] = value;
    await setState({ ...state, attribute });
  };

  const handleAddOption = () => {
    const attribute = _.cloneDeep(state.attribute);
    attribute.options.push(_.cloneDeep(newAttributeOption()));
    setState({ ...state, attribute });
  };

  const handleOptionFormChange = (e, optionId) => {
    console.clear();
    let { name, value } = e.target;
    console.log(91, optionId, name, value);
    const attribute = _.cloneDeep(state.attribute);

    if (name === 'option') {
      value = alphaNumericValidate(value);
    }

    if (name === 'gsm') {
      value = numericValidate(value);
    }

    if (name === 'price' || name === 'setUpPrice' || name === 'minPrice') {
      value = moneyValidate(value);
    }

    if (name === 'days') {
      value = numericValidate(value);
    }

    const index = attribute.options.findIndex((f) => f._id === optionId);

    attribute.options[index][name] = value;

    if (value === null) return;
    setState({ ...state, attribute });
  };

  const handleRemoveOption = (optionId) => {
    console.log(86, optionId);
    const attribute = _.cloneDeep(state.attribute);
    const optionIndex = attribute.options.findIndex((f) => f._id === optionId);
    attribute.options.splice(optionIndex, 1);
    setState({ ...state, attribute });
  };

  if (!state.attribute) {
    return (
      <>
        <div />
      </>
    );
  }

  return (
    <>
      <PageTemplateHeader
        displayName={'Attribute Management'}
        button={{
          text: 'New Attribute',
          url: '/console/product-management/attribute/new',
        }}
      />

      <AttributeHolder
        state={state}
        handeDeleteAttribute={handeDeleteAttribute}
        handleFormChange={handleFormChange}
        handleOptionFormChange={handleOptionFormChange}
        handleAddOption={handleAddOption}
        handleRemoveOption={handleRemoveOption}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

// 0 Stock w/Weight
// 1 Setup w/Price per Hundred
// 2 Option w/ Flat Rate
// 3 Option w/Price per Hundred
// 4 Option w/Percentage
// 5 OPtion w/ Setup w/Price per Hundred

// console.log(358, attributes[i].options[selectedOptionIndex]);
// thisOption = attributes[i].options[selectedOptionIndex];
// let temp21 = parseInt(thisOption.setUpPrice) + parseInt(thisOption.price);
// let temp22 = parseInt(thisOption.minPrice);

// let temp23 = temp21 < temp22 ? temp21 : temp22;

// attrPrice += temp23;
