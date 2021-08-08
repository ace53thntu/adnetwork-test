import {AuthAPIRequest} from 'api/auth.api';
import React from 'react';
import {useQueryClient} from 'react-query';
import {useNavigate} from 'react-router-dom';
import * as authHelpers from 'utils/helpers/auth.helpers';

/** dispatch actions */
import * as authActions from './actions';
/** context */
import {AuthDispatchContext, AuthStateContext} from './provider';

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

function useAuth() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const client = useQueryClient();

  const login = React.useCallback(
    async ({email, password, setIsLoading, setError}) => {
      setError(null);
      setIsLoading(true);
      if (!!email && !!password) {
        try {
          const res = await AuthAPIRequest.login({email, password});
          setIsLoading(false);
          authHelpers.setToken(res.access_token);
          authHelpers.setRefreshToken(res.refresh_token);
          dispatch(authActions.loginSuccess());
          return res;
        } catch (error) {
          setIsLoading(false);
          setError('Email or password incorrect!');
        }
      } else {
        dispatch(authActions.loginFailure());
        setError('Something went wrong.');
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const getUserAuthorize = React.useCallback(async token => {
    try {
      const authRes = await AuthAPIRequest.getProfile({
        options: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });
      // dispatch(authActions.loginSuccess());
      return authRes;
    } catch (error) {
      console.log('check error');
    }
  }, []);

  const logout = React.useCallback(async () => {
    try {
      authHelpers.removeToken();
      authHelpers.removeRefreshToken();
      authHelpers.removeUser();
      client.clear();
      dispatch(authActions.logoutSuccess());
      navigate('/login');
    } catch (error) {
      console.log('error', error);
    }
  }, [client, dispatch, navigate]);

  return {
    login,
    logout,
    getUserAuthorize,
    state: authState,
    dispatch
  };
}

export {useAuth};
