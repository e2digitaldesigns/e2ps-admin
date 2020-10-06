import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import http from '../../../../../utils/httpServices';

import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import ProductForm from './omn-product-form';

import {
  productOneParser,
  filterProductResults,
  newOrderFormSubmit,
  productPricingCalculate,
  alphaNumericValidate,
  moneyValidate,
} from './../../_utils/';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default (props) => {
  const history = useHistory();
  const query = useQuery();
  const defaultStoreId = useSelector(
    (state) => state.system.defaultStoreFrontId,
  );

  const system = useSelector((state) => state.system);

  const generateInvoiceId = (storeFrontId) => {
    const ext = system.storeFronts.find((f) => f._id === storeFrontId).ext;
    return ext;
  };

  const initialProductState = {
    itemType: '',
    activeProductId: null,
    activeProductIndex: 0,
    activeProductSizeIndex: 0,
    activeProductSizeId: null,
    activeProductQuantityIndex: 0,
    activeProductQuantityId: null,
    activeProductSidesCode: '1',
    activeProductSides: '1',
    selectedAttributes: [],
    listing: [],
  };

  const initialOrderState = {
    basePrice: 0,
    attributePrice: 0,
    itemPrice: 0,
    shipping: { price: 0, weight: 0 },
    turnTime: 0,
    weight: 0,
  };

  const theClientSearchRef = React.createRef();
  const initialCustomerState = { _id: null };

  const [customerSearch, setCustomerSearch] = useState({
    isLoading: false,
    options: undefined,
  });

  const [customerState, setCustomerState] = useState({
    ...initialCustomerState,
  });

  const [productState, setProductState] = useState({ ...initialProductState });

  const [orderState, setOrderState] = useState({
    name: '',
    ...initialOrderState,
    invoiceNote: '',
    designTheme: '',
    designInfoSide1: '',
    designInfoSide2: '',
    images: [],
  });

  const [invoiceState, setInvoiceState] = useState({
    _id: null,
    invoiceId: generateInvoiceId(defaultStoreId),
    storeFrontId: defaultStoreId,
    invoiceType: '_compCart',
  });

  const [starterState, setStarterState] = useState({
    systemSet: false,
    addToInvoice: false,
    invoiceId: null,
  });

  useEffect(() => {
    let stillHereInv = true;
    console.log(109, 'ppppppppppppppppp');

    if (query.get('iId')) {
      const loadInvoice = async () => {
        try {
          const { data } = await http.get(`invoices/${query.get('iId')}`);

          if (data.error.errorCode === '0x0' && stillHereInv) {
            setStarterState((starterState) => ({
              ...starterState,
              systemSet: true,
              addToInvoice: true,
              invoiceId: query.get('iId'),
            }));

            console.log(118, data.invoice.customers);

            setCustomerState((customerState) => ({
              _id: data.invoice.customers._id,
              ...data.invoice.customers.contact,
            }));

            setInvoiceState((invoiceState) => ({
              ...invoiceState,
              _id: data.invoice._id,
              storeFrontId: data.invoice.storeFrontId,
              invoiceId: data.invoice.invoiceId,
              invoiceType: data.invoice.invoiceType,
            }));
          }
        } catch (error) {
          console.log(105, error);
        }
      };

      loadInvoice();
    }

    return () => {
      stillHereInv = false;
    };
  }, []); //added query

  useEffect(() => {
    let stillHereCustomer = true;
    if (query.get('cId')) {
      const loadCustomer = async () => {
        try {
          const { data } = await http.get(`customers/${query.get('cId')}`);
          if (data.error.errorCode === '0x0' && stillHereCustomer) {
            setStarterState((starterState) => ({
              ...starterState,
              systemSet: true,
              addToInvoice: false,
            }));

            console.log(158, data.dataSet.storeFrontId);
            setCustomerState((customerState) => ({
              _id: data.dataSet._id,
              ...data.dataSet.contact,
            }));

            setInvoiceState((invoiceState) => ({
              ...invoiceState,
              storeFrontId: data.dataSet.storeFrontId,
            }));
          }
        } catch (err) {
          console.log(21, err);
        }
      };

      loadCustomer();
    }

    return () => {
      stillHereCustomer = false;
    };
  }, []); //added query

  const handleFormChange = (e) => {
    e.preventDefault();
    const { name: target, value } = e.target;
    const theInvoice = _.cloneDeep(invoiceState);

    if (target === 'storeFrontId') {
      setProductState({ ...initialProductState });
      setCustomerState({ ...initialCustomerState });
      setOrderState({ ...orderState, ...initialOrderState });
      theClientSearchRef.current.clear();
      theInvoice.invoiceId = generateInvoiceId(value);
    }

    theInvoice[target] = value;
    setInvoiceState({ ...theInvoice });
  };

  const handleOrderFormChange = (e) => {
    e.preventDefault();
    console.clear();

    let { name, value } = e.target;
    console.log(203, name, value);

    if (name === 'name') {
      value = alphaNumericValidate(value, true);
    }

    if (value) setOrderState({ ...orderState, [name]: value });
    return;
  };

  const handleSearch = async (query) => {
    setCustomerSearch({ ...customerSearch, isLoading: true });

    try {
      const { data } = await http.get(
        `customers/search?q=${query}&s=${invoiceState.storeFrontId}`,
      );

      const searchResults = data.customers.map((i) => ({
        id: i._id,
        label: `${i.contact.companyName} - ${i.contact.firstName} ${i.contact.lastName}`,
        ...i,
      }));

      setCustomerSearch({ options: searchResults, isLoading: false });
    } catch (error) {
      console.log(109, error);
    }
  };

  const handleSearchSelected = (selected) => {
    if (!selected) {
      setProductState({ ...initialProductState });
      setCustomerState({ ...initialCustomerState });
      setOrderState({ ...orderState, ...initialOrderState });
      theClientSearchRef.current.clear();
      return;
    }
    const select = _.cloneDeep(selected);
    delete select.label;
    setCustomerState({ ...select });
  };

  const formSubmit = async () => {
    console.clear();

    const obj = newOrderFormSubmit(
      productState,
      orderState,
      invoiceState,
      starterState,
      customerState,
    );

    obj.itemObj.orderItem.originalItemPrice = obj.itemObj.orderItem.itemPrice;
    console.log(252, 'xxxxxxxxxxxxxx', obj);
    // return;

    try {
      const { data } = await http.post(`invoices`, { ...obj });
      console.log(253, data);
      if (data.error.errorCode === '0x0') {
        history.push(`/console/order-management/invoice/${data.dataSet._id}`);
      }
    } catch (error) {}
  };

  const handleItemTypeChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.clear();

    if (value === 'print') {
      try {
        const { data } = await http.get(
          `products/products/search/?t=print&s=${invoiceState.storeFrontId}`,
        );

        if (data.error.errorCode === '0x0' && data.products.length > 0) {
          const product = productOneParser(data.products[0]);

          setProductState({
            itemType: value,
            activeProductId: product.activeProductId,
            activeProductIndex: 0,
            activeProductSizeIndex: 0,
            activeProductSizeId: product.activeProductSizeId,
            activeProductQuantityIndex: 0,
            activeProductQuantityId: product.activeProductQuantityId,
            activeProductSidesCode: product.activeProductSidesCode,
            activeProductSides: product.activeProductSides,
            selectedAttributes: product.selectedAttributes,
            listing: filterProductResults(data.products),
          });
        }
      } catch (error) {
        console.error(182, error);
      }
    }

    if (value === 'design') {
      try {
        const { data } = await http.get(
          `products/products/search/?t=design&s=${invoiceState.storeFrontId}`,
        );

        if (data.error.errorCode === '0x0' && data.products.length > 0) {
          const product = productOneParser(data.products[0]);

          setProductState({
            itemType: value,
            activeProductId: product.activeProductId,
            activeProductIndex: 0,
            activeProductSizeIndex: 0,
            activeProductSizeId: product.activeProductSizeId,
            activeProductQuantityIndex: 0,
            activeProductQuantityId: product.activeProductQuantityId,
            activeProductSidesCode: product.activeProductSidesCode,
            activeProductSides: product.activeProductSides,
            selectedAttributes: product.selectedAttributes,
            listing: filterProductResults(data.products),
          });
        }
      } catch (error) {
        console.log(182, error);
      }
    }
  };

  const handleProductIdChange = (e) => {
    const index = productState.listing.findIndex(
      (f) => f._id === e.target.value,
    );
    const product = productOneParser(productState.listing[index]);

    setProductState({
      ...productState,
      activeProductId: product.activeProductId,
      activeProductIndex: index,
      activeProductSizeIndex: 0,
      activeProductSizeId: product.activeProductSizeId,
      activeProductQuantityIndex: 0,
      activeProductQuantityId: product.activeProductQuantityId,
      activeProductSidesCode: product.activeProductSidesCode,
      activeProductSides: product.activeProductSides,
      selectedAttributes: product.selectedAttributes,
    });
  };

  const handleProductSizeChange = (e) => {
    const { value: theSizeIndex } = e.target;

    const product = productOneParser(
      productState.listing[productState.activeProductIndex],
      theSizeIndex,
    );

    setProductState({
      ...productState,
      activeProductSizeIndex: theSizeIndex,
      activeProductSizeId: product.activeProductSizeId,
      activeProductQuantityIndex: 0,
      activeProductQuantityId: product.activeProductQuantityId,
      activeProductSidesCode: product.activeProductSidesCode,
      activeProductSides: product.activeProductSides,
    });
  };

  const handleProductQuantityChange = (e) => {
    const { value: theQuantityIndex } = e.target;
    const product = productOneParser(
      productState.listing[productState.activeProductIndex],
      productState.activeProductSizeIndex,
      theQuantityIndex,
    );

    setProductState({
      ...productState,
      activeProductQuantityIndex: theQuantityIndex,
      activeProductQuantityId: product.activeProductQuantityId,
      activeProductSidesCode: product.activeProductSidesCode,
      activeProductSides: product.activeProductSides,
    });
  };

  const handleProductSidesChange = (e) => {
    const { value: activeProductSides } = e.target;
    setProductState({
      ...productState,
      activeProductSides,
    });
  };

  const handleAttributeOptionChange = (e, attributeIndex) => {
    const optionId = e.target.value;
    const state = _.cloneDeep(productState);
    let optionIndex =
      e.target.name === '1'
        ? null
        : state.listing[state.activeProductIndex].attributes[
            attributeIndex
          ].options.findIndex((f) => f._id === optionId);

    state.selectedAttributes[attributeIndex].optionIndex = optionIndex;
    state.selectedAttributes[attributeIndex].optionId = optionId;
    setProductState({ ...state });
  };

  useEffect(() => {
    if (!productState.activeProductId) return;
    const totals = productPricingCalculate(productState);

    setOrderState((orderState) => ({
      ...orderState,
      ...totals,
    }));
  }, [productState]);

  const handlePriceChange = (e) => {
    let value = moneyValidate(e.target.value);

    setOrderState({
      ...orderState,
      itemPrice: value,
    });
  };

  const labelCol = 3,
    fieldCol = 9;

  return (
    <>
      <PageTemplateHeader displayName="Order Management" />

      <Card className="main-content-card">
        <Form.Row>
          <Col sm={12} md={6} lg={6}>
            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Store: {starterState.systemSet}
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  as="select"
                  size="sm"
                  name="storeFrontId"
                  value={invoiceState.storeFrontId}
                  disabled={starterState.systemSet}
                  onChange={(e) => handleFormChange(e)}
                >
                  {useSelector((state) => state.system.storeFronts).map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.domain + ' - ' + m.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Client {starterState.systemSet}
              </Form.Label>
              {!starterState.systemSet ? (
                <Col sm={fieldCol}>
                  <AsyncTypeahead
                    ref={theClientSearchRef}
                    id="clientSearch"
                    isLoading={customerSearch.isLoading}
                    labelKey="label"
                    minLength={3}
                    onSearch={handleSearch}
                    onChange={(selected) => {
                      handleSearchSelected(selected[0]);
                    }}
                    options={customerSearch.options}
                    size="sm"
                    placeholder="Search for a customer..."
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <span>{option.label}</span>
                      </div>
                    )}
                  />
                </Col>
              ) : (
                <Col sm={fieldCol}>
                  <Form.Control
                    size="sm"
                    value={
                      customerState.companyName +
                      ' - ' +
                      customerState.firstName +
                      ' ' +
                      customerState.lastName
                    }
                    disabled
                    readOnly
                  />
                </Col>
              )}
            </Form.Group>
          </Col>
          <Col as={Col} sm={12} md={6} lg={6}>
            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Type:
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  disabled={!customerState._id}
                  as="select"
                  size="sm"
                  name="itemType"
                  value={productState.itemType}
                  onChange={(e) => handleItemTypeChange(e)}
                >
                  {productState.itemType === '' && (
                    <option value="">Choose...</option>
                  )}

                  <option value="print">Print</option>
                  <option value="design">Design</option>
                  <option value="wideFormat">Wide Format - Coming Soon</option>
                  <option value="booklets">Booklets - Coming Soon</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column="sm" sm={labelCol}>
                Name
              </Form.Label>
              <Col sm={fieldCol}>
                <Form.Control
                  size="sm"
                  name="name"
                  value={orderState.name}
                  onChange={(e) => handleOrderFormChange(e)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
      </Card>

      <Card className="main-content-card">
        <h5>Price: {orderState.itemPrice}</h5>
      </Card>

      {productState.activeProductId && (
        <ProductForm
          labelCol={labelCol}
          fieldCol={fieldCol}
          orderState={orderState}
          productState={productState}
          handleOrderFormChange={handleOrderFormChange}
          handleProductIdChange={handleProductIdChange}
          handleProductSizeChange={handleProductSizeChange}
          handleProductQuantityChange={handleProductQuantityChange}
          handleProductSidesChange={handleProductSidesChange}
          handleAttributeOptionChange={handleAttributeOptionChange}
          addToInvoice={starterState.addToInvoice}
          invoiceType={invoiceState.invoiceType}
          handleInvoiceFormChange={handleFormChange}
          handlePriceChange={handlePriceChange}
        />
      )}

      {productState.itemType !== '' && (
        <Card className="main-content-card">
          <Form.Row>
            <Col sm={12}>
              <Form.Group as={Row}>
                <Form.Label column="sm" sm={1}>
                  Notes
                </Form.Label>
                <Col sm={11}>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    size="sm"
                    name="invoiceNote"
                    value={orderState.invoiceNote}
                    onChange={(e) => handleOrderFormChange(e)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Form.Row>
        </Card>
      )}

      {/* <Card className="main-content-card">
        <h5>Base: {orderState.basePrice}</h5>
        <h5>Attr: {orderState.attributePrice}</h5>
        <h5>Item: {orderState.itemPrice}</h5>
        <h5>Days: {orderState.turnTime}</h5>
        <h5>Weight: {orderState.shipping.weight}</h5>
      </Card> */}

      <Card className="main-content-card">
        <Button
          variant="primary"
          type="submit"
          size="sm"
          onClick={(e) => formSubmit()}
        >
          Submit
        </Button>
      </Card>
    </>
  );
};
