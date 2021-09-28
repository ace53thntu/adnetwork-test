import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {INPUTS_NAME} from '../constants';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      [INPUTS_NAME.NAME]: yup.string().required(t('required')),
      [INPUTS_NAME.DSP_UUID]: yup
        .object()
        .required(t('required'))
        .typeError(t('required'))
    })
  );
};
