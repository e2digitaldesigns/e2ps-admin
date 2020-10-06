import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import uniqid from 'uniqid';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { updateProduct } from './../../../../../redux/actions/products/productActions';

import ProductManagementProfileMenu from './product-management-profile-menu';
import ProductManagementProfileSizeList from './product-management-profile-size-list';
import ProductManagementProfileSizeProfile from './product-management-profile-size-profile';
import ProductManagementProfileQuantities from './product-management-profile-quantities';
import ProductManagementProfileAttributes from './product-management-profile-attributes';
import ProductManagementProfileImages from './product-images/product-management-profile-images';

import { compareObjValues } from './../../../../../utils/applicationGlobals';
import {
  newAttribute,
  newAttributeOption,
} from '../utils/attributeHolder/globalFunctions';

import {
  moneyValidate,
  alphaNumericValidate,
  numberMaxValidate,
  numericValidate,
} from '../../_utils';

export default () => {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const dataSet = useSelector((state) => state.products.product);

  const [state, setState] = useState({
    docReady: false,
    group: 3,
    activeSizeId: null,
    activeAttributeId: null,
    product: {},
  });

  useEffect(() => {
    async function fetchData() {
      const product = _.cloneDeep(dataSet);
      product.attributes = product.attributes.sort(compareObjValues('order'));

      for (let i = 0; i < product.attributes.length; i++) {
        const set = product.attributes[i];
        product.attributes[i].tempName = set.name;
        product.attributes[i].options = set.options.sort(
          compareObjValues('order'),
        );
      }

      product.productSizes = product.productSizes.sort(
        compareObjValues('order'),
      );

      for (let i = 0; i < product.productSizes.length; i++) {
        product.productSizes[i].quantities = product.productSizes[
          i
        ].quantities.sort(compareObjValues('quantity'));
      }

      setState((state) => ({
        ...state,
        docReady: true,
        product,
        temp: _.cloneDeep(product),
      }));
    }

    fetchData();
  }, [dataSet]);

  /////////////////////////////////////////
  // INFORMATION //////////////////////////
  /////////////////////////////////////////
  const formChange = (e) => {
    let { name, value } = e.target;
    console.log(83, name, value);
    const product = _.cloneDeep(state.product);
    value = value === 'true' ? true : value === 'false' ? false : value;

    if (name === 'name' || name === 'displayName') {
      value = alphaNumericValidate(value, true);
    }

    product[name] = value;
    if (value !== null) setState({ ...state, product });
  };

  const switchChange = (e) => {
    const product = _.cloneDeep(state.product);
    product[e.target.id] = !product[e.target.id];
    setState({ ...state, product });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const product = _.cloneDeep(state.product);
    console.log(102, product);

    for (let i = 0; i < product.attributes.length; i++) {
      delete product.attributes[i].tempName;
    }

    try {
      const result = await dispatch(updateProduct(product));
      if (result.error.errorCode !== '0x0') {
        throw result.error.errorDesc;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleGroupChange = (group) => {
    setState({ ...state, group });
  };
  /////////////////////////////////////////
  // INFORMATION //////////////////////////
  /////////////////////////////////////////

  /////////////////////////////////////////
  // SIZES ////////////////////////////////
  /////////////////////////////////////////
  const handleNewSize = () => {
    const product = _.cloneDeep(state.product);
    const activeSizeId = uniqid('', '_size');

    product.productSizes.push({
      _id: activeSizeId,
      isActive: false,
      size: '0x0',
      dpi: 300,
      margin: 0.125,
      order: 0,
      designPrice1: '0.00',
      designPrice2: '0.00',
      quantities: [],
    });

    setState({ ...state, activeSizeId, product, temp: product });
  };

  const handleSizeFormChange = (e) => {
    console.clear();
    let { name, value } = e.target;
    const product = _.cloneDeep(state.product);
    const productSize = product.productSizes.find(
      (f) => f._id === state.activeSizeId,
    );

    if (name === 'width') {
      value = numericValidate(value, 4);
      productSize.size = value + 'x' + productSize.size.split('x')[1];
    } else if (name === 'height') {
      value = numericValidate(value, 4);
      productSize.size = productSize.size.split('x')[0] + 'x' + value;
    } else if (name === 'isActive') {
      productSize[name] = !productSize['isActive'];
    } else if (name === 'order') {
      productSize[name] = parseInt(value);
    } else {
      if (name === 'dpi') {
        value = numberMaxValidate(value, 5);
      }
      if (name === 'margin') {
        value = numericValidate(value, 4);
      }
      if (name === 'designPrice1' || name === 'designPrice2') {
        value = moneyValidate(value);
      }
      productSize[name] = value;
    }

    if (value !== null) setState({ ...state, product });
  };

  const handleRemoveSize = (sizeId) => {
    const product = _.cloneDeep(state.product);
    const index = product.productSizes.findIndex((f) => f._id === sizeId);
    product.productSizes.splice(index, 1);
    const activeSizeId =
      state.activeSizeId === sizeId ? null : state.activeSizeId;

    setState({ ...state, product, activeSizeId });
  };

  const handleSizeSelector = (activeSizeId) => {
    setState({ ...state, activeSizeId });
  };
  /////////////////////////////////////////
  // SIZES ////////////////////////////////
  /////////////////////////////////////////

  /////////////////////////////////////////
  // QUANTITIES ///////////////////////////
  /////////////////////////////////////////
  const handleNewQuantity = () => {
    const product = _.cloneDeep(state.product);
    const sizeIndex = product.productSizes.findIndex(
      (f) => f._id === state.activeSizeId,
    );

    product.productSizes[sizeIndex].quantities.push({
      _id: uniqid('', '_quantity'),
      isActive: false,
      quantity: 0,
      sides: '1',
      price1: '0.00',
      price2: '0.00',
    });
    setState({ ...state, product });
  };

  const handleQuantityFormChange = (e, quantityId) => {
    console.clear();
    let { name, value } = e.target;
    console.log(152, name, value);

    const product = _.cloneDeep(state.product);
    const size = product.productSizes.find((f) => f._id === state.activeSizeId);
    const qty = size.quantities.find((f) => f._id === quantityId);

    if (name === 'quantity') {
      value = numericValidate(value);
    }

    if (name === 'isActive') {
      value = !qty['isActive'];
    }

    if (name === 'price1' || name === 'price2') {
      value = moneyValidate(value);
    }

    qty[name] = value;
    console.table(product.productSizes[0].quantities[0]);
    if (value !== null) setState({ ...state, product });
  };

  const handleRemoveQuantity = (quantityId) => {
    const product = _.cloneDeep(state.product);
    const size = product.productSizes.find((f) => f._id === state.activeSizeId);
    const index = size.quantities.findIndex((f) => f._id === quantityId);
    size.quantities.splice(index, 1);
    setState({ ...state, product });
  };
  /////////////////////////////////////////
  // QUANTITIES ///////////////////////////
  /////////////////////////////////////////

  /////////////////////////////////////////
  // ATTRIBUTES ///////////////////////////
  /////////////////////////////////////////
  const handleNewAttribute = (orderCount) => {
    const product = _.cloneDeep(state.product);
    const attr = newAttribute();
    attr.order = parseInt(orderCount + 1);
    product.attributes.push(attr);
    setState({ ...state, product, temp: product });
  };

  const handleAttrSelector = (activeAttributeId) => {
    setState({ ...state, activeAttributeId });
  };

  const handleFormAttrChange = (e, attributeId = null) => {
    console.clear();
    let { name, value } = e.target;
    console.log(276, attributeId, name, value);
    const product = _.cloneDeep(state.product);

    const searchAttrId = attributeId ? attributeId : state.activeAttributeId;
    const index = product.attributes.findIndex((f) => f._id === searchAttrId);

    console.log(282, 'index', index);

    if (name === 'type' && product.attributes[index].options.length === 0) {
      handleAddAttrOption(index);
    }

    if (name === 'isActive') {
      value = !product.attributes[index].isActive;
    }

    if (name === 'name') {
      value = alphaNumericValidate(value);
    }

    if (value === null) return;
    product.attributes[index][name] = value;
    setState({ ...state, product });
  };

  const handeDeleteAttribute = (attributeId) => {
    const activeAttributeId =
      attributeId === state.activeAttributeId ? null : state.activeAttributeId;
    const product = _.cloneDeep(state.product);
    const index = product.attributes.findIndex((f) => f._id === attributeId);
    if (product.attributes[index].system) return;
    product.attributes.splice(index, 1);
    setState({ ...state, activeAttributeId, product, temp: product });
  };

  const handleOptionFormAttrChange = (e, optionId) => {
    let { name, value } = e.target;
    console.log(312, name, value);
    const product = _.cloneDeep(state.product);
    const attribute = product.attributes.find(
      (f) => f._id === state.activeAttributeId,
    );

    const optionIndex = attribute.options.findIndex(
      (fi) => fi._id === optionId,
    );

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

    if (value === null) return;
    attribute.options[optionIndex][name] = value;
    setState({ ...state, product });
  };

  const handleAddAttrOption = () => {
    const product = _.cloneDeep(state.product);
    const newAttrOption = _.cloneDeep(newAttributeOption());
    const index = product.attributes.findIndex(
      (f) => f._id === state.activeAttributeId,
    );
    product.attributes[index].options.push(newAttrOption);
    setState({ ...state, product });
  };

  const handleRemoveAttrOption = (optionId) => {
    const product = _.cloneDeep(state.product);
    const attribute = product.attributes.find(
      (f) => f._id === state.activeAttributeId,
    );

    const optionIndex = attribute.options.findIndex(
      (fi) => fi._id === optionId,
    );

    attribute.options.splice(optionIndex, 1);
    setState({ ...state, product });
  };

  const handleFormAttrSubmit = (e) => {
    formSubmit(e);
  };

  /////////////////////////////////////////
  // ATTRIBUTES ///////////////////////////
  /////////////////////////////////////////

  const descriptionTextareaSize =
    state.product.isDesign === true && state.product.isPrint === true ? 6 : 12;

  const save =
    JSON.stringify(dataSet.attributes) === JSON.stringify(state.attributes)
      ? 'saved'
      : 'unsaved';

  if (!state.docReady) {
    return <div />;
  }

  return (
    <>
      <Card className="main-content-card">
        <Form autoComplete="off">
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6} lg={4}>
              <Form.Label>Store Front {save}</Form.Label>
              <Form.Control
                as="select"
                name="storeFrontId"
                size="sm"
                value={state.product.storeFrontId}
                onChange={(e) => formChange(e)}
              >
                {system.storeFronts.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.domain + ' - ' + m.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6} lg={4}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                size="sm"
                required
                value={state.product.name}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} sm={12} md={6} lg={4}>
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                name="displayName"
                size="sm"
                required
                value={state.product.displayName}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isActive'}
                type="switch"
                label={'Is Active'}
                checked={state.product.isActive}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isAdmin'}
                type="switch"
                label={'Admin Only'}
                checked={state.product.isAdmin}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isPrint'}
                type="switch"
                label={'Print'}
                checked={state.product.isPrint}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isDesign'}
                type="switch"
                label={'Design'}
                checked={state.product.isDesign}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group>

            {/* <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isAutoDesc'}
                type="switch"
                label={'Auto Description'}
                checked={state.product.isAutoDesc}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group> */}

            <Form.Group as={Col} xs={6} md={3}>
              <Form.Check
                id={'isFeatured'}
                type="switch"
                label={'Featured'}
                checked={state.product.isFeatured}
                onChange={(e) => switchChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <hr />
          <Form.Row>
            {state.product.isPrint === true && (
              <Form.Group
                as={Col}
                sm={12}
                md={descriptionTextareaSize}
                controlId="printDesc"
              >
                <Form.Label>Print Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="printDesc"
                  rows="5"
                  value={state.product.printDesc}
                  onChange={(e) => formChange(e)}
                />
              </Form.Group>
            )}

            {state.product.isDesign && (
              <Form.Group
                as={Col}
                sm={12}
                md={descriptionTextareaSize}
                controlId="designDesc"
              >
                <Form.Label>Design Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="designDesc"
                  rows="5"
                  value={state.product.designDesc}
                  onChange={(e) => formChange(e)}
                />
              </Form.Group>
            )}
          </Form.Row>
          <Form.Row>
            <Button size="sm" onClick={(e) => formSubmit(e)}>
              Save Changes
            </Button>
          </Form.Row>
        </Form>
      </Card>

      <ProductManagementProfileMenu
        group={state.group}
        handleGroupChange={handleGroupChange}
      />

      {state.group === 1 && (
        <>
          <ProductManagementProfileSizeList
            state={state}
            handleNewSize={handleNewSize}
            handleRemoveSize={handleRemoveSize}
            handleSizeSelector={handleSizeSelector}
          />

          {state.activeSizeId !== null && (
            <ProductManagementProfileSizeProfile
              state={state}
              handleSizeFormChange={handleSizeFormChange}
              formSubmit={formSubmit}
            />
          )}

          {state.activeSizeId !== null && (
            <ProductManagementProfileQuantities
              state={state}
              handleNewQuantity={handleNewQuantity}
              handleQuantityFormChange={handleQuantityFormChange}
              handleRemoveQuantity={handleRemoveQuantity}
              formSubmit={formSubmit}
            />
          )}
        </>
      )}

      {state.group === 2 && state.product.attributes && (
        <ProductManagementProfileAttributes
          state={state}
          handleNewAttribute={handleNewAttribute}
          handleAttrSelector={handleAttrSelector}
          handeDeleteAttribute={handeDeleteAttribute}
          handleFormChange={handleFormAttrChange}
          handleOptionFormChange={handleOptionFormAttrChange}
          handleAddOption={handleAddAttrOption}
          handleRemoveOption={handleRemoveAttrOption}
          handleFormSubmit={handleFormAttrSubmit}
        />
      )}

      {state.group === 3 && <ProductManagementProfileImages />}
    </>
  );
};
