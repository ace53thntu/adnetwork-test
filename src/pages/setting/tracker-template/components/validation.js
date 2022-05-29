import {yupResolver} from '@hookform/resolvers/yup';
import { checkValidJson } from 'pages/Creative/components/BannerForm/utils';
import * as yup from 'yup';
import {InputNames} from '../constant';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      [InputNames.NAME]: yup.string().required(t('required')),
      [InputNames.STATUS]: yup.string().required(t('required')),
      [InputNames.TYPE]: yup
        .object()
        .required(t('required'))
        .typeError(t('required')),

      [InputNames.PRICE]: yup.string().required(t('required')),
      [InputNames.VARIABLES]: yup.string().test(
        'isValidJson',
        'Invalid JSON object',
        val => {
          if (val?.length) {
            return checkValidJson(val);
          }

          return true;
        }
      ),
      // [InputNames.CODE]: yup.string().required(t('required')),

      // [InputNames.CLICK_URL]: yup.string().required(t('required')),
      // [InputNames.CLICK_IMAGE]: yup.string().required(t('required')),
      // [InputNames.CLICK_SCRIPT]: yup.string().required(t('required')),
    })
  );
};
