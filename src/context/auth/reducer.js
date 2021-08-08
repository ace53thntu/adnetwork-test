import {isLoggedIn} from 'utils/helpers/auth.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

import * as actionTypes from './types';

const authInitialState = {
  isAuthenticated: isLoggedIn(),
  endpoints: {}
};

const handleActions = {
  [actionTypes.LOGIN_SUCCESS]: loginSuccess,
  [actionTypes.LOGIN_FAILURE]: loginFailure,
  [actionTypes.LOGOUT_SUCCESS]: loginFailure
};

function loginSuccess(state, action) {
  state.isAuthenticated = true;
}
function loginFailure(state, action) {
  state.isAuthenticated = false;
}
const authReducer = (initialState = authInitialState, action) =>
  createReducer(initialState, action, handleActions);

export {authReducer, authInitialState};
