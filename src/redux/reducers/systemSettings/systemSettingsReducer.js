import * as actions from './../../actions/actionTypes';
import _ from 'lodash';

const systemSettingsReducer = (
  state = {
    pending: false,
    error: null,
  },
  action,
) => {
  const { type, payload } = action;
  const theState = _.cloneDeep(state);

  switch (type) {
    case actions.GET_SYSTEM_SETTINGS_PENDING:
      return { ...state, pending: true, error: null };

    case actions.GET_SYSTEM_SETTINGS_SUCCESS:
      return {
        ...state,
        pending: false,
        ...payload,
        error: null,
      };

    case actions.GET_SYSTEM_SETTINGS_FAILURE:
      return { ...state, pending: false, error: payload.error };

    case actions.UPDATE_SYSTEM_SETTINGS_PENDING:
      return { ...state, pending: true, errorUpdate: null };

    case actions.UPDATE_SYSTEM_SETTINGS_SUCCESS:
      if (payload.result.nModified === 1) {
        theState.settings[payload.formData.type] = payload.formData.data;
      }

      return { ...theState, pending: false, errorUpdate: null };

    case actions.UPDATE_SYSTEM_SETTINGS_FAILURE:
      return { ...state, pending: false, errorUpdate: payload.error };

    default:
      return state;
  }
};

export default systemSettingsReducer;
