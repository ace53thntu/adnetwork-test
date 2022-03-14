import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export const loginFormResolver = () => {
  return yupResolver(
    Yup.object().shape({
      email: Yup.string()
        .required('Email is required.')
        .test('is-valid-email', 'Email invalid', eVal => {
          // eslint-disable-next-line no-useless-escape
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (eVal.match(mailformat)) {
            return true;
          }

          return false;
        }),
      password: Yup.string()
        .required('Password is required.')
        .min(5, 'Password must be at least 5 characters')
    })
  );
};
