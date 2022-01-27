import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {InputNames} from '../constant';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      [InputNames.NAME]: yup.string().required(t('required'))
    })
  );
};
