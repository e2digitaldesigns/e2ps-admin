import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import OrderFormDesign from './omn-product-form-design';
import OrderFormPrint from './omn-product-form-print';
import OrderFormPrintAttributes from './omn-product-form-print-attributes';

import { handleProductSidesOptionParser } from './../../_utils';

export default ({
  labelCol,
  fieldCol,
  orderState,
  productState,
  handleOrderFormChange,
  handleProductIdChange,
  handleProductSizeChange,
  handleProductQuantityChange,
  handleProductSidesChange,
  handleAttributeOptionChange,
  addToInvoice,
  invoiceType,
  handleInvoiceFormChange,
  handlePriceChange,
}) => {
  let activeProductSizes = [],
    activeProductQuantities = [],
    activeProductAttributes = [];

  if (productState.activeProductId) {
    const theProduct = productState.listing[productState.activeProductIndex];
    activeProductAttributes = theProduct.attributes;
    activeProductSizes = theProduct.productSizes;
    activeProductQuantities =
      activeProductSizes[productState.activeProductSizeIndex].quantities;
  }

  return (
    <>
      <Card className="main-content-card">
        <Form.Row>
          <Col sm={12} md={6} lg={6}>
            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Item
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  as="select"
                  size="sm"
                  name="productId"
                  value={productState.activeProductId}
                  onChange={(e) => handleProductIdChange(e)}
                >
                  {productState.listing.map((m, i) => (
                    <option key={i} value={m._id}>
                      {m.displayName}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Size
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  as="select"
                  size="sm"
                  name="productSize"
                  value={productState.activeProductSizeIndex}
                  onChange={(e) => handleProductSizeChange(e)}
                >
                  {activeProductSizes.map(
                    (m, index) =>
                      m.isActive && (
                        <option key={index} value={index}>
                          {m.size}
                        </option>
                      ),
                  )}
                </Form.Control>
              </Col>
            </Form.Group>

            {productState.itemType === 'print' && (
              <OrderFormPrint
                labelCol={labelCol}
                fieldCol={fieldCol}
                productState={productState}
                activeProductQuantities={activeProductQuantities}
                handleProductQuantityChange={handleProductQuantityChange}
                handleProductSidesChange={handleProductSidesChange}
              />
            )}

            {productState.itemType === 'design' && (
              <Form.Group as={Row}>
                <Form.Label column="sm" sm={labelCol}>
                  Sides
                </Form.Label>
                <Col sm={fieldCol}>
                  <Form.Control
                    as="select"
                    size="sm"
                    name="productSides"
                    value={productState.activeProductSides}
                    onChange={(e) => handleProductSidesChange(e)}
                  >
                    {handleProductSidesOptionParser(productState)}
                  </Form.Control>
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Price
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  size="sm"
                  name="itemPriceOverride"
                  value={orderState.itemPrice}
                  onChange={(e) => handlePriceChange(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Cart
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  as="select"
                  size="sm"
                  name="invoiceType"
                  value={invoiceType}
                  onChange={(e) => handleInvoiceFormChange(e)}
                  disabled={addToInvoice}
                >
                  <option value="_compCart">Comp Cart</option>
                  <option value="_shoppingCart">Shopping Cart</option>
                  <option value="_estimate">Estimate</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>

          {productState.itemType === 'print' && (
            <Col as={Col} sm={12} md={6} lg={6}>
              <OrderFormPrintAttributes
                activeProductAttributes={activeProductAttributes}
                handleAttributeOptionChange={handleAttributeOptionChange}
              />
            </Col>
          )}

          {productState.itemType === 'design' && (
            <Col as={Col} sm={12} md={6} lg={6}>
              <OrderFormDesign
                labelCol={labelCol}
                fieldCol={fieldCol}
                orderState={orderState}
                handleOrderFormChange={handleOrderFormChange}
              />
            </Col>
          )}
        </Form.Row>
      </Card>
    </>
  );
};
