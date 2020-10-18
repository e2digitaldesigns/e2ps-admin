import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { updateInvoiceSegmentById } from '../../../../../../../redux/actions/invoices/invoiceActions';

import {
  handleProductSidesOptionParser,
  handleAttributeOptionParser,
  productPricingCalculate,
  alphaNumericValidate,
  moneyValidate,
} from '../../../../_utils';

export default ({ menuState, orderId, assets }) => {
  const dispatch = useDispatch();
  const currentOrderProductState = useRef();
  const asset = _.cloneDeep(assets);
  const product = asset.theItem;
  const labelCol = 4;
  const fieldCol = 8;

  const [state, setState] = useState({ docReady: false });

  const [orderProductState, setOrderProductState] = useState({
    activeProductSizeId: null,
    activeProductQuantityId: '',
    activeProductSidesCode: '2',
    activeProductSides: '1',
    selectedAttributes: [],
  });

  const [updateState, setUpdateState] = useState({
    jobName: assets.item.name,
    invoiceNote: assets.item.invoiceNote,
    calcDays: 0,
    calcWeight: 0,
    calcPrice: 0,
  });

  useEffect(() => {
    let stillHere = true;
    if (orderProductState.activeProductSizeId) return;

    const activeProductSize =
      product.productSizes[product.selections.activeProductSizeIndex];

    const activeProductQuantity =
      activeProductSize.quantities[
        product.selections.activeProductQuantityIndex
      ];

    setOrderProductState((orderProductState) => ({
      activeProductSizeId: activeProductSize._id,
      activeProductQuantityId: activeProductQuantity._id,
      activeProductSidesCode: product.selections.activeProductSidesCode,
      activeProductSides: product.selections.activeProductSides,
      selectedAttributes: product.selections.selectedAttributes,
    }));

    if (stillHere) {
      setState((state) => ({ ...state, docReady: true }));
    }

    return () => {
      stillHere = false;
    };
  }, [product, orderProductState]);

  useEffect(() => {
    let stillHere = true;
    if (!orderProductState.activeProductSizeId) return;
    if (_.isEqual(orderProductState, currentOrderProductState.current)) return;
    currentOrderProductState.current = orderProductState;

    const obj = {
      itemType: 'print',
      activeProductSizeId: orderProductState.activeProductSizeId,
      productSizes: product.productSizes.find(
        (f) => f._id === orderProductState.activeProductSizeId,
      ),
      activeProductQuantityId: orderProductState.activeProductQuantityId,
      activeProductSides: orderProductState.activeProductSides,
      attributes: product.attributes,
      selectedAttributes: orderProductState.selectedAttributes,
    };

    if (stillHere) {
      const pricing = productPricingCalculate(obj, 'edit');
      setUpdateState((updateState) => ({
        ...updateState,
        calcPrice: pricing.itemPrice,
        calcDays: pricing.turnTime,
        calcWeight: pricing.shipping.weight,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [product, orderProductState, currentOrderProductState]);

  const handleChangeSize = (e) => {
    const activeProductSizeId = e.target.value;
    const activeProductQuantity = product.productSizes.find(
      (f) => f._id === activeProductSizeId,
    ).quantities[0];

    setOrderProductState({
      ...orderProductState,
      activeProductSizeId,
      activeProductQuantityId: activeProductQuantity._id,
      activeProductSidesCode: activeProductQuantity.sides,
      activeProductSides: activeProductQuantity.sides === '_2' ? 2 : 1,
      activeProductSizeIndex: 0,
    });
  };

  const handleChangeQuantity = (e) => {
    const activeProductQuantity = product.productSizes
      .find((f) => f._id === orderProductState.activeProductSizeId)
      .quantities.find((q) => q._id === e.target.value);

    setOrderProductState({
      ...orderProductState,
      activeProductQuantityId: activeProductQuantity._id,
      activeProductSidesCode: activeProductQuantity.sides,
      activeProductSides: activeProductQuantity.sides === '_2' ? 2 : 1,
      activeProductSizeIndex: 0,
    });
  };

  const handleFormChange = (e) => {
    let { name, value } = e.target;

    if (name === 'jobName') {
      value = alphaNumericValidate(value);
    }

    if (value) {
      setUpdateState({ ...updateState, [e.target.name]: e.target.value });
    }
  };

  const handleChangeSides = (e) => {
    setOrderProductState({
      ...orderProductState,
      activeProductSides: e.target.value,
    });
  };

  const handleAttributeOptionChange = (e, attributeIndex) => {
    const optionId = e.target.value;
    const tempState = _.cloneDeep(orderProductState);

    const optionIndex =
      e.target.name === '1'
        ? null
        : product.attributes[attributeIndex].options.findIndex(
            (f) => f._id === optionId,
          );

    tempState.selectedAttributes[attributeIndex].optionIndex = optionIndex;
    tempState.selectedAttributes[attributeIndex].optionId = optionId;
    setOrderProductState({ ...tempState });
  };

  const handleChangeEditOrderPrice = (e) => {
    setUpdateState({
      ...updateState,
      calcPrice: moneyValidate(e.target.value),
    });
  };

  const editOrderFormSubmit = async (e) => {
    const selections = _.cloneDeep(product.selections);

    const activeProductSizeIndex = product.productSizes.findIndex(
      (f) => f._id === orderProductState.activeProductSizeId,
    );

    const activeProductQuantityIndex = product.productSizes[
      activeProductSizeIndex
    ].quantities.findIndex(
      (f) => f._id === orderProductState.activeProductQuantityId,
    );

    const editOrderSelections = {
      ...selections,
      activeProductSizeIndex,
      activeProductSizeId: orderProductState.activeProductSizeId,
      activeProductQuantityIndex,
      activeProductQuantityId: orderProductState.activeProductQuantityId,
      activeProductSidesCode: orderProductState.activeProductSidesCode,
      activeProductSides: orderProductState.activeProductSides,
      selectedAttributes: [...orderProductState.selectedAttributes],
    };

    await dispatch(
      updateInvoiceSegmentById({
        cId: assets.customerId,
        id: orderId,
        name: 'editOrder',
        itemPrice: updateState.calcPrice,
        turnTime: updateState.calcDays,
        weight: updateState.calcWeight,
        jobName: updateState.jobName,
        invoiceNote: updateState.invoiceNote,
        editOrderSelections,
      }),
    );
  };

  const productSize = product.productSizes.find(
    (f) => f._id === orderProductState.activeProductSizeId,
  );

  const formQuantities = productSize ? productSize.quantities : [];

  if (!state.docReady || !orderProductState.activeProductSizeId) {
    return <div />;
  }

  return (
    <span
      id={`editMenu-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      <li>
        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Name
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              size="sm"
              name="jobName"
              value={updateState.jobName}
              onChange={(e) => handleFormChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Size
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              as="select"
              size="sm"
              value={orderProductState.activeProductSizeId}
              onChange={(e) => handleChangeSize(e)}
            >
              {product.productSizes.map(
                (m, index) =>
                  m.isActive && (
                    <option key={index} value={m._id}>
                      {m.size}
                    </option>
                  ),
              )}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Qty
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              as="select"
              size="sm"
              value={orderProductState.activeProductQuantityId}
              onChange={(e) => handleChangeQuantity(e)}
            >
              {formQuantities.map((m, index) => (
                <option key={index} value={m._id}>
                  {m.quantity}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Sides
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              as="select"
              size="sm"
              value={orderProductState.activeProductSides}
              onChange={(e) => handleChangeSides(e)}
            >
              {handleProductSidesOptionParser(orderProductState)}
            </Form.Control>
          </Col>
        </Form.Group>

        {product.attributes.map((m, index) => (
          <Form.Group as={Row} key={index} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              {m.name}
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                as="select"
                size="sm"
                name={m.type}
                value={handleAttributeOptionValueParser(
                  orderProductState,
                  m._id,
                )}
                onChange={(e) => handleAttributeOptionChange(e, index)}
              >
                {handleAttributeOptionParser(m, index)}
              </Form.Control>
            </Col>
          </Form.Group>
        ))}

        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Price
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              size="sm"
              name={'price'}
              value={updateState.calcPrice}
              onChange={(e) => handleChangeEditOrderPrice(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="formGroupRow">
          <Col>
            <Form.Control
              as="textarea"
              rows={5}
              size="sm"
              placeholder="invoice note..."
              name={'invoiceNote'}
              value={updateState.invoiceNote}
              onChange={(e) => handleFormChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="formGroupRow">
          <Col>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              onClick={(e) => editOrderFormSubmit()}
              block
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </li>
    </span>
  );
};

const handleAttributeOptionValueParser = (data, id) => {
  const option = data.selectedAttributes.find((f) => f.attrId === id);
  if (option && option.optionId) {
    return option.optionId;
  } else {
  }
};
