import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export function createVideoFormResolver() {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Required.'),
      click_url: Yup.string().required('Required.'),
      width: Yup.string().test(
        'is-number',
        'Width must be a integer number and greater than 0.',
        val => {
          const reg = /^\d+$/;
          const parsed = parseInt(val, 10);
          const isNumber = reg.test(val);
          if (isNumber && parsed > 0) {
            return true;
          }
          return false;
        }
      ),
      height: Yup.string().test(
        'is-number',
        'Width must be a integer number and greater than 0.',
        val => {
          const reg = /^\d+$/;
          const parsed = parseInt(val, 10);
          const isNumber = reg.test(val);
          if (isNumber && parsed > 0) {
            return true;
          }
          return false;
        }
      )
    })
  );
}
