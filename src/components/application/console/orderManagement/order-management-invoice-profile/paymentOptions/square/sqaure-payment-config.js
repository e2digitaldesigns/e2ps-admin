import http from './../../../../../../../utils/httpServices';

const config = {
  // Initialize the payment form elements

  //TODO: Replace with your sandbox application ID
  applicationId: 'sandbox-sq0idb-Q0Pdj_9u1Fa6nYFvxi2p6g',
  inputClass: 'sq-input',
  autoBuild: false,

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [
    {
      fontSize: '16px',
      lineHeight: '24px',
      padding: '16px',
      placeholderColor: '#a0a0a0',
      backgroundColor: 'transparent',
    },
  ],

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: 'Card Number',
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV',
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY',
  },
  postalCode: {
    elementId: 'sq-postal-code',
    placeholder: 'Postal',
  },

  // SqPaymentForm callback functions
  callbacks: {
    cardNonceResponseReceived: async function (errors, nonce, cardData) {
      if (errors) {
        console.error('Encountered errors:');
        errors.forEach(function (error) {
          console.error('  ' + error.message);
        });
        return;
      }

      const orderId = document.querySelector('#orderId').value;

      const data = await http.post('paymentProcessing/square/capture', {
        nonce: nonce,
        paymentAmountType: document.querySelector('#paymentAmountType').value,
        paymentAmount: document.querySelector('#paymentAmount').value,
        invoiceId: document.querySelector('#invoiceId').value,
        orderId: orderId === 'null' ? null : orderId,
        paymentGateway: 'square',
        customerId: document.querySelector('#customerId').value,
      });

      console.log(66, data);
    },
  },
};

export default config;
