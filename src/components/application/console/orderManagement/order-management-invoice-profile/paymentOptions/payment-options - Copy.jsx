import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { slideDown, slideStop, slideUp, isVisible } from 'slide-anim';

import GeneralPaymentForm from './payment-form/payment-form';
import SquarePayment from './square/square-payment';
import EnterPayment from './enter-payment/enter-payment';

export default () => {
  const system = useSelector((state) => state.system);
  const paymentGateways = _.cloneDeep(system.settings.paymentGateway);

  // const initMenuState = { make: false, enter: false };
  // const [menuState, setMenuState] = useState(initMenuState);

  // const optionChange = (option) => {
  //   console.clear();
  //   console.log(!menuState[option]);

  //   setMenuState({ ...initMenuState, [option]: !menuState[option] });
  // };

  const optionChange = (option) => {
    console.clear();
    console.log(26, option);
    // const value = !menuState[option];
    // console.log(28, value);

    const duration = 2000;

    let checker;

    const toggleElement = document.querySelector(
      `#invoice-payment-option-div-${option}`,
    );

    let hideElements = document.querySelectorAll(
      `.invoice-payment-option-div:not(#invoice-payment-option-div-${option})`,
    );

    for (let i = 0; i < hideElements.length; i++) {
      checker = document.querySelector('#' + hideElements[i].id);
      slideStop(checker);
      if (isVisible(checker)) {
        slideUp(checker, {
          duration: duration * 0.75,
        });
      }
    }

    if (isVisible(toggleElement)) {
      slideUp(toggleElement, { duration: duration * 0.75 });
    } else {
      slideDown(toggleElement, { duration: duration });
    }

    // setMenuState({ ...initMenuState, [option]: !menuState[option] });
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
        <li className="default" style={{ borderBottom: '1px solid #efefef' }}>
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

      <div>
        <div
          id="invoice-payment-option-div-make"
          className="customer-info height-auto invoice-payment-option-div"
          style={{ height: 'auto ', borderBottom: 0, display: 'none' }}
        >
          {gateway}
        </div>

        <div
          id="invoice-payment-option-div-enter"
          className="customer-info height-auto invoice-payment-option-div"
          style={{ height: 'auto', borderBottom: 0, display: 'none' }}
        >
          <EnterPayment />
        </div>
      </div>

      {/* {menuState.make && (
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
      )} */}
    </>
  );
};
