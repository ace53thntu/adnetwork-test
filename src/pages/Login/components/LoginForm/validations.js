import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export const loginFormResolver = () => {
  return yupResolver(
    Yup.object().shape({
      email: Yup.string().required('Username/Email is required.'),
      password: Yup.string()
        .required('Password is required.')
        .min(5, 'Password must be at least 5 characters')
    })
  );
};
