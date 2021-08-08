import {createAction} from 'utils/helpers/createAction.helpers';

import * as actionTypes from './types';

/** login */
export const loginSuccess = () => createAction(actionTypes.LOGIN_SUCCESS);
export const loginFailure = () => createAction(actionTypes.LOGIN_FAILURE);

/** logout */
export const logoutSuccess = () => createAction(actionTypes.LOGOUT_SUCCESS);

export const setEndpoints = () => createAction(actionTypes.SET_ENDPOINTS);
export const getEndpoints = () => createAction(actionTypes.GET_ENDPOINTS);
