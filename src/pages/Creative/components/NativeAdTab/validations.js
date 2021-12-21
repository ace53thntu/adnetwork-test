import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {ASSET_TYPES_IS_FILE} from './constants';

export function createNativeAdResolver(isEdit = false) {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Required.'),
      assets: Yup.array()
        .nullable()
        .of(
          Yup.object().shape({
            custom_id: Yup.string().test(
              'is-number',
              'Custom ID must be a integer number and greater than 0.',
              val => {
                if (!val?.length) {
                  return false;
                }
                const reg = /^\d+$/;
                const parsed = parseInt(val, 10);
                const isNumber = reg.test(val);
                if (isNumber && parsed > 0) {
                  return true;
                }
                return false;
              }
            ),
            value: Yup.string().when('type', typeVal => {
              if (!ASSET_TYPES_IS_FILE.includes(typeVal.id)) {
                return Yup.string().required('Required.');
              }

              return Yup.string().notRequired();
            }),
            file: Yup.object()
              .nullable()
              .when('type', typeVal => {
                if (ASSET_TYPES_IS_FILE.includes(typeVal.id)) {
                  return Yup.object().nullable().required('Required.');
                }
                return Yup.object().nullable().notRequired();
              })
          })
        )
    })
  );
}
