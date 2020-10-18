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
  productPricingCalculate,
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
      ...orderProductState,
      activeProductSizeId: activeProductSize._id,
      activeProductQuantityId: activeProductQuantity._id,
      activeProductSidesCode: product.selections.activeProductSidesCode,
      activeProductSides: product.selections.activeProductSides,
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
      itemType: 'design',
      activeProductSizeId: orderProductState.activeProductSizeId,
      productSizes: product.productSizes.find(
        (f) => f._id === orderProductState.activeProductSizeId,
      ),
      activeProductQuantityId: orderProductState.activeProductQuantityId,
      activeProductSides: orderProductState.activeProductSides,
    };

    if (stillHere) {
      const pricing = productPricingCalculate(obj, 'edit');

      setUpdateState((updateState) => ({
        ...updateState,
        calcPrice: pricing.itemPrice,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [product, orderProductState, currentOrderProductState]);

  const handleFormChange = (e) => {
    setUpdateState({ ...updateState, [e.target.name]: e.target.value });
  };

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

  const handleChangeSides = (e) => {
    setOrderProductState({
      ...orderProductState,
      activeProductSides: e.target.value,
    });
  };

  const handleChangeEditOrderPrice = (e) => {
    setUpdateState({
      ...updateState,
      calcPrice: e.target.value,
    });
  };

  const editOrderFormSubmit = async (e) => {
    const selections = _.cloneDeep(product.selections);

    const activeProductSizeIndex = product.productSizes.findIndex(
      (f) => f._id === orderProductState.activeProductSizeId,
    );

    const editOrderSelections = {
      ...selections,
      activeProductSizeIndex,
      activeProductSizeId: orderProductState.activeProductSizeId,
      activeProductQuantityId: orderProductState.activeProductQuantityId,
      activeProductSidesCode: orderProductState.activeProductSidesCode,
      activeProductSides: orderProductState.activeProductSides,
    };

    await dispatch(
      updateInvoiceSegmentById({
        id: orderId,
        name: 'editOrder',
        itemPrice: updateState.calcPrice,
        jobName: updateState.jobName,
        invoiceNote: updateState.invoiceNote,
        editOrderSelections,
      }),
    );
  };

  // const productSize = product.productSizes.find(
  //   (f) => f._id === orderProductState.activeProductSizeId,
  // );

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

        <Form.Group as={Row}>
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
          <Form.Label column="sm" sm={labelCol}>
            Note
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              as="textarea"
              rows={5}
              size="sm"
              name={'invoiceNote'}
              value={updateState.invoiceNote}
              onChange={(e) => handleFormChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
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
      </li>{' '}
    </span>
  );
};

// const handleAttributeOptionValueParser = (data, id) => {
//   const option = data.selectedAttributes.find((f) => f.attrId === id);
//   if (option && option.optionId) {
//     return option.optionId;
//   } else {
//   }
// };
