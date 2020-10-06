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
    /*
     * callback function: cardNonceResponseReceived
     * Triggered when: SqPaymentForm completes a card nonce request
     */
    cardNonceResponseReceived: function (errors, nonce, cardData) {
      if (errors) {
        // Log errors from nonce generation to the browser developer console.
        console.error('Encountered errors:');
        errors.forEach(function (error) {
          console.error('  ' + error.message);
        });
        console.log(
          'Encountered errors, check browser developer console for more details',
        );
        return;
      }
      // alert(`The generated nonce is:\n${nonce}`);
      //TODO: Replace alert with code in step 2.1

      const theTest = document.querySelector('#test');
      const what = document.getElementById('test');
      const amount = document.getElementById('sq-card-amount').value;
      console.log(59, theTest, what, amount);

      fetch(
        process.env.REACT_APP_REST_API + '/api/v1/paymentProcessing/square',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nonce: nonce,
          }),
        },
      )
        .catch((err) => {
          alert('Network error: ' + err);
        })
        .then((response) => {
          if (!response.ok) {
            return response
              .json()
              .then((errorInfo) => Promise.reject(errorInfo)); //UPDATE HERE
          }
          return response.json(); //UPDATE HERE
        })
        .then((data) => {
          console.log(data); //UPDATE HERE
          console.log(
            'Payment complete successfully!\nCheck browser developer console for more details',
          );
        })
        .catch((err) => {
          console.error(err);
          console.log(
            'Payment failed to complete!\nCheck browser developer console for more details',
          );
        });
    },
  },
};

export default config;
