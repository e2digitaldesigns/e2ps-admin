import * as actions from '../../actions/actionTypes';

const usersReducer = (
  state = {
    pending: false,
    dataSet: {},
    error: null,
  },
  action,
) => {
  let theState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_CUSTOMER_PROFILE_PENDING':
      return { ...state, pending: true };

    case 'FETCH_CUSTOMER_PROFILE_SUCCESS':
      return { ...state, pending: false, dataSet: payload.dataSet };

    case 'FETCH_CUSTOMER_PROFILE_FAILURE':
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_CUSTOMER_PROFILE_PENDING:
      return { ...state, pending: true };

    case actions.UPDATE_CUSTOMER_PROFILE_SUCCESS:
      theState.pending = false;

      if (
        payload.result.nModified === 1 &&
        payload.formData.updateType === 'contact'
      ) {
        theState.dataSet.isActive = payload.formData.isActive;
        theState.dataSet.contact.companyName = payload.formData.companyName;
        theState.dataSet.contact.firstName = payload.formData.firstName;
        theState.dataSet.contact.lastName = payload.formData.lastName;
        theState.dataSet.contact.address1 = payload.formData.address1;
        theState.dataSet.contact.phone = payload.formData.phone;
        theState.dataSet.contact.email = payload.formData.email;
        theState.dataSet.contact.mobile = payload.formData.mobile;
        theState.dataSet.contact.pin = payload.formData.pin;
        theState.dataSet.contact.address1 = payload.formData.address1;
        theState.dataSet.contact.address2 = payload.formData.address2;
        theState.dataSet.contact.city = payload.formData.city;
        theState.dataSet.contact.state = payload.formData.state;
        theState.dataSet.contact.zipCode = payload.formData.zipCode;
      }
      return theState;

    case actions.UPDATE_CUSTOMER_PROFILE_FAILURE:
      return { ...state, pending: false, error: payload };

    default:
      return theState;
  }
};

export default usersReducer;
