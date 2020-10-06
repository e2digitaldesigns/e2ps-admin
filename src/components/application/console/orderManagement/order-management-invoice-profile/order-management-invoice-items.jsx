import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { slideDown, slideUp, isVisible } from 'slide-anim';
// import { slideDown, slideUp, slideStop, isVisible } from 'slide-anim';
import Card from 'react-bootstrap/Card';

import PrintItemEditForm from './forms/edit-forms/omip-print-items-edit-form';
import PrintItemOptions from './forms/edit-options/omip-print-items-options';

import DesignItemEditForm from './forms/edit-forms/omip-design-items-edit-form';
import DesignItemOptions from './forms/edit-options/omip-design-items-options';

import StatusSelector from './forms/status-selector/status-selector';
import StaffNotesForm from './forms/staff-notes/staff-notes-form';
import Supplier from './forms/supplier/supplier';
import ImageLinks from './forms/image-links/image-links';
import ReOrder from './forms/re-order/re-order';
import ImageUploader from './forms/image-uploader/image-uploader';
import ShippingForm from './forms/shipping-forms/shipping-forms';

import AssignToPrint from './forms/assign-to-print/assign-to-print';
import CreatePrintOrder from './forms/create-print-order/create-print-order';
import Designer from './forms/designer/designer';
import SourceFiles from './forms/source-files/source-files';

import { dateParser, moneyFormatParser, turnTimeParser } from './../../_utils';

import {
  updateInvoiceSegmentById,
  deleteInvoiceItem,
} from './../../../../../redux/actions/invoices/invoiceActions';

import loadingImage from '../../../../../imaging/loading-squares.gif';

export default ({ orderId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const invoice = useSelector((state) => state.invoice.invoice);

  const orderItemLoader = useSelector(
    (state) => state.invoice.orderItemLoaders,
  );

  const orderItemLoaders = orderItemLoader[orderId]
    ? orderItemLoader[orderId]
    : [];

  const assets = _.cloneDeep(
    invoice.storeInvoiceItems.find((f) => f._id === orderId),
  );

  const orderItem = orderInformationParser(assets);

  const [invoiceInformation, setInvoiceInformation] = useState({
    ..._.cloneDeep(assets.item.invoiceInformation),
  });

  const initMenuState = {
    assignToPrintOrder: false,
    createPrintOrder: false,
    designer: false,
    imageLinks: false,
    editMenu: false,
    quickOrder: false,
    reOrder: false,
    shipping: false,
    sourceFiles: false,
    staffNotes: false,
    supplier: false,
    sendFiles: false,
  };

  const [menuState] = useState({ ...initMenuState });

  const menuToggle = (menu) => {
    console.clear();
    const duration = 1200;
    const toggleElement = document.querySelector(`#${menu}-${orderId}`);

    const hideElements = document.querySelectorAll(
      `.editMenuClasser-${orderId}:not(#${menu}-${orderId})`,
    );

    let checker;

    for (let i = 0; i < hideElements.length; i++) {
      checker = document.querySelector('#' + hideElements[i].id);
      if (isVisible(checker)) {
        slideUp(checker, {
          duration: duration * 0.75,
        });
      }
    }

    if (isVisible(toggleElement)) {
      slideUp(toggleElement, { duration: duration * 0.5 });
    } else {
      slideDown(toggleElement, { duration: duration });
    }
  };

  const deleteOrderItem = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure you want to delete this order?',
    );
    if (confirm !== true) return;

    const result = await dispatch(
      deleteInvoiceItem({
        orderId,
        invoiceId: invoice._id,
        theInvoiceId: invoice.invoiceId,
      }),
    );

    if (result.error && result.error.errorCode === '0x0') {
      if (result.theReturn === 'invoice-list') {
        history.replace(`/console/order-management/listing`);
      }
    }
  };

  const editOrderSegments = async (e) => {
    let { value, name } = e.target;

    if (
      name === 'allowReOrders' ||
      name === 'allowDownloads' ||
      name === 'designManager'
    ) {
      value = !invoiceInformation[name];
    }

    const result = await dispatch(
      updateInvoiceSegmentById({
        cId: assets.customerId,
        id: orderId,
        orderNum: assets.orderId,
        name,
        value,
      }),
    );

    if (result.error.errorCode === '0x0') {
      setInvoiceInformation({
        ...invoiceInformation,
        [name]: !invoiceInformation[name],
      });
    }
  };

  return (
    <>
      <Card className="main-content-card" id={`invoice_item_${assets.orderId}`}>
        <div className="invoice-item-holder invoice-item-bar">
          <div className="invoice-item-bar-div invoice-item-bar-div-left header">
            Date | Time
          </div>
          <div className="invoice-item-bar-div invoice-item-bar-div-middle area1 header">
            <div>OrderID</div>
            <div>Name</div>
            <div>Type</div>
          </div>
          <div className="invoice-item-bar-div invoice-item-bar-div-right area2 header">
            <div>Status</div>
            <div>Total</div>
            {/* <div>Ship</div> */}
            <div>Due</div>
          </div>
          <div className="invoice-item-bar-div invoice-item-bar-div-left">
            {dateParser(assets.orderDate, 'xs')}
          </div>
          <div className="invoice-item-bar-div invoice-item-bar-div-middle area3">
            <div>{assets.orderId}</div>
            <div>{invoice.customers.contact.companyName}</div>
            <div>{assets.itemType}</div>
          </div>
          <div className="invoice-item-bar-div invoice-item-bar-div-right area4">
            <div>
              <StatusSelector
                assets={assets}
                editOrderSegments={editOrderSegments}
              />
            </div>
            <div>
              {moneyFormatParser(
                assets.item.itemPrice + assets.item.shipping.price,
              )}
            </div>
            {/* <div>{moneyFormatParser(assets.item.shipping.price)}</div> */}
            <div>
              {moneyFormatParser(
                assets.item.itemPrice +
                  assets.item.shipping.price -
                  assets.item.amountPaid,
              )}
            </div>
          </div>
        </div>

        <div className="invoice-item-holder invoice-item-bar-ajax">
          <div className="invoice-item-bar-ajax-div invoice-item-bar-ajax-left">
            EB: XPL Admin
          </div>
          <div className="invoice-item-bar-ajax-div invoice-item-bar-ajax-middle area5">
            <div>
              <span className="invoice-label">Domain:</span> expresslayouts.com
            </div>
            <div>
              <img
                className={`invoice-item-bar-loader ${
                  orderItemLoaders.length > 0
                    ? 'invoice-item-bar-loader-show'
                    : 'invoice-item-bar-loader-hide'
                }`}
                id={'invoice-item-bar-loader-' + assets.orderId}
                alt={assets.orderId}
                src={loadingImage}
              />
            </div>
          </div>
          <div className="invoice-item-bar-ajax-div invoice-item-bar-ajax-right area6">
            {/* ajax response */}
          </div>
        </div>

        <div className="invoice-item-holder">
          <div className="invoice-item-div invoice-item-div-left">
            <ul className="invoice-list-ul">
              {/* <li>Design Manager</li> */}
              <li></li>
              <li>
                <a href="/#" onClick={(e) => deleteOrderItem(e)}>
                  Delete Order
                </a>
              </li>
            </ul>
          </div>
          <div className="invoice-item-div invoice-item-div-middle area7">
            <ul className="invoice-list-ul normalize">
              <li className="default">
                <span className="invoice-label">Invoice:</span>{' '}
                {invoice.invoiceId} | Email Invoice
              </li>
              <li>
                <span className="invoice-label">Item:</span>{' '}
                {orderItem.itemName}
                <br />
                <span className="invoice-label">Job Name:</span>{' '}
                {assets.item.name}
                <br />
                <span className="invoice-label">Price:</span>{' '}
                {moneyFormatParser(assets.item.itemPrice)}
                <br />
                <span className="invoice-label">Size:</span> {orderItem.size}
                <br />
                {assets.itemType === 'print' && (
                  <>
                    <span className="invoice-label">Quantity:</span>{' '}
                    {orderItem.quantity}
                    <br />
                  </>
                )}
                <span className="invoice-label">Sides:</span> {orderItem.sides}
              </li>

              {assets.itemType === 'print' && (
                <li>{attributeDisplayParser(assets)}</li>
              )}

              <li>
                <span className="invoice-label">Order Date:</span>{' '}
                {dateParser(assets.orderDate, 'md', true)}
                {assets.itemType === 'print' && (
                  <>
                    <br />
                    <span className="invoice-label">Turn Time:</span>{' '}
                    {assets.item.turnTime} Business Day
                    {assets.item.turnTime !== 1 && <>s</>}
                    <br />
                    <span className="invoice-label">
                      Latest Ship Date:
                    </span>{' '}
                    {dateParser(
                      turnTimeParser(assets.orderDate, assets.item.turnTime),
                      'md',
                    )}
                  </>
                )}
              </li>
              <li>
                <span className="invoice-label">Coupon Code:</span>{' '}
                {orderItem.couponCode}
              </li>

              {assets.itemType === 'print' && (
                <PrintItemOptions
                  orderId={orderId}
                  menuState={menuState}
                  menuToggle={menuToggle}
                  invoiceInformation={invoiceInformation}
                  assets={assets}
                  editOrderSegments={editOrderSegments}
                />
              )}

              {assets.itemType === 'design' && (
                <DesignItemOptions
                  orderId={orderId}
                  menuState={menuState}
                  menuToggle={menuToggle}
                  invoiceInformation={invoiceInformation}
                  assets={assets}
                  editOrderSegments={editOrderSegments}
                />
              )}

              {assets.itemType === 'print' && (
                <>
                  <PrintItemEditForm
                    menuState={menuState.editMenu}
                    orderId={orderId}
                    assets={assets}
                  />

                  <Supplier orderId={orderId} />

                  <ImageLinks orderId={orderId} data={assets.item.imageLinks} />

                  <ReOrder
                    menuState={menuState.reOrder}
                    orderId={orderId}
                    invoice={invoice}
                  />

                  <ShippingForm
                    menuState={menuState.shipping}
                    orderId={orderId}
                  />
                </>
              )}

              {assets.itemType === 'design' && (
                <>
                  <DesignItemEditForm
                    menuState={menuState.editMenu}
                    orderId={orderId}
                    assets={assets}
                  />

                  <AssignToPrint orderId={orderId} />
                  <CreatePrintOrder orderId={orderId} />
                  <Designer orderId={orderId} />
                  <SourceFiles orderId={orderId} />
                </>
              )}

              <StaffNotesForm orderId={orderId} data={assets.item.staffNotes} />
            </ul>
          </div>
          <div className="invoice-item-div invoice-item-div-right area8">
            <ul className="invoice-list-ul normalize">
              <li className="invoice-image-grid">
                <ImageUploader orderId={orderId} side="1" />
                <ImageUploader orderId={orderId} side="2" />
              </li>
              <li style={{ textAlign: 'center' }}></li>

              {/* <li>09/22/18 04:15am | admin Rod Van Blake</li>
              <li>Create New Design Order Note</li> */}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

// function turnTimeParser(orderDate, turnTimeDays, cutOffTime = 13) {
//   let newDate = new Date(orderDate);

//   //business day end
//   if (
//     newDate.getHours() >= cutOffTime &&
//     newDate.getDay() !== 6 &&
//     newDate.getDay() !== 0
//   ) {
//     turnTimeDays++;
//   }

//   for (let i = 0; i <= turnTimeDays; i++) {
//     newDate = new Date(orderDate);
//     newDate.setDate(newDate.getDate() + i);

//     //holidays

//     //weekends
//     if (newDate.getDay() === 6 || newDate.getDay() === 0) {
//       turnTimeDays++;
//     }
//   }

//   const endDate = new Date(orderDate);
//   endDate.setDate(endDate.getDate() + turnTimeDays);
//   return endDate;
// }

function orderInformationParser(assets) {
  const product =
    assets.theItem.productSizes[
      assets.theItem.selections.activeProductSizeIndex
    ];

  const size = product.size;

  const quantity =
    product.quantities[assets.theItem.selections.activeProductQuantityIndex]
      .quantity;

  const sides = assets.theItem.selections.activeProductSides;
  const itemName = `${quantity} ${size} ${assets.theItem.displayName}`;
  const invInformation = assets.item.invoiceInformation;
  const couponCode = invInformation.couponId ? invInformation.couponId : 'n/a';

  return { itemName, size, quantity, sides, couponCode };
}

const attributeDisplayParser = (data) => {
  if (data.itemType !== 'print') return;
  const attrs = data.theItem.attributes;
  const selects = data.theItem.selections.selectedAttributes;

  return (
    <>
      {attrs.map((m, i) => (
        <React.Fragment key={i}>
          <span className="invoice-label">{m.name}:</span>{' '}
          {handleAttributeOptionDisplayParser(m, selects, m._id)}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

const handleAttributeOptionDisplayParser = (attribute, data, id) => {
  const option = data.find((f) => f.attrId === id);

  if (attribute.type === '1') {
    return option.optionId === '1' ? 'Yes' : 'No';
  } else if (option && option.optionId) {
    return attribute.options.find((f) => f._id === option.optionId).option;
  }
};
