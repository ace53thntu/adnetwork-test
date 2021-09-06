import * as yup from 'yup';

export const schemaValidate = t => {
  return yup.object().shape({
    name: yup.string().required(t('required'))
  });
};
