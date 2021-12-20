import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {USER_ROLE} from '../constants';

export const schemaValidate = (t, isEdit = false) => {
  const passwordValidate = !isEdit
    ? yup.string().required(t('required'))
    : yup.string().nullable().notRequired();

  return yupResolver(
    yup.object().shape({
      username: yup.string().required(t('required')),
      password: passwordValidate,
      email: yup.string().email('Invalid email format').required(t('required')),
      role: yup.object().required(t('required')).typeError(t('required')),
      advertiser_uuid: yup.object().when('role', value => {
        if (value?.value === USER_ROLE.ADVERTISER) {
          return yup.object().required(t('required')).typeError(t('required'));
        }
        return yup.object().nullable().notRequired();
      })
    })
  );
};
