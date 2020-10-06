import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// import { slideDown, slideStop, slideUp, isVisible } from 'slide-anim';

import GeneralPaymentForm from './payment-form/payment-form';
import SquarePayment from './square/square-payment';
import EnterPayment from './enter-payment/enter-payment';

export default () => {
  const system = useSelector((state) => state.system);
  const paymentGateways = _.cloneDeep(system.settings.paymentGateway);

  const initMenuState = { make: false, enter: false };
  const [menuState, setMenuState] = useState(initMenuState);

  const optionChange = (option) => {
    setMenuState({ ...initMenuState, [option]: !menuState[option] });
  };

  let gateway;

  if (paymentGateways.payPalPro.isActive === true) {
    gateway = <GeneralPaymentForm paymentGateway="payPalPro" />;
  } else if (paymentGateways.square.isActive === true) {
    gateway = <SquarePayment />;
  } else if (paymentGateways.authorizeNet.isActive === true) {
    gateway = <GeneralPaymentForm paymentGateway="authorizeNet" />;
  }

  return (
    <>
      <ul className="invoice-list-ul">
        <li
          className={
            menuState.enter === true || menuState.make === true
              ? 'border-nav-bottom'
              : 's'
          }
        >
          <span
            className="invoice-option-link"
            onClick={() => optionChange('make')}
          >
            Make Credit Card Payment
          </span>{' '}
          |{' '}
          <span
            className="invoice-option-link"
            onClick={() => optionChange('enter')}
          >
            Enter Payment
          </span>
        </li>
      </ul>

      {menuState.make && (
        <div
          className="customer-info"
          style={{ height: 'auto', borderBottom: 0 }}
        >
          {gateway}
        </div>
      )}

      {menuState.enter && (
        <div
          className="customer-info"
          style={{ height: 'auto', borderBottom: 0 }}
        >
          <EnterPayment />
        </div>
      )}
    </>
  );
};
