import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      template_uuid: yup
        .object()
        .required(t('required'))
        .typeError(t('required')),
      reference_type: yup
        .object()
        .required(t('required'))
        .typeError(t('required')),
      reference_uuid: yup
        .object()
        .required(t('required'))
        .typeError(t('required'))
    })
  );
};
