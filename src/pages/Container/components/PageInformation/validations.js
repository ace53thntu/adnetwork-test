import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {isValidURL} from 'utils/helpers/validations.helpers';

export const validationPage = (pages = [], isMobile = false) => {
  if (isMobile) {
    return yupResolver(
      Yup.object().shape({
        name: Yup.string()
          .required('Page name is required.')
          .test('is-exist', 'Page name existed.', value => {
            if (value?.length) {
              if (pages?.length) {
                return pages.every(
                  page =>
                    page?.name?.trim().toLowerCase() !==
                    value.trim().toLowerCase()
                );
              }
              return true;
            }
            return true;
          })
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      name: Yup.string()
        .required('Page name is required.')
        .test('is-exist', 'Page name existed.', value => {
          if (value?.length) {
            if (pages?.length) {
              return pages.every(
                page =>
                  page?.name?.trim().toLowerCase() !==
                  value.trim().toLowerCase()
              );
            }
            return true;
          }
          return true;
        }),
      url: Yup.string()
        .required('Page URL is required.')
        .test('is-url', 'Enter correct url!', value => {
          if (value?.length) {
            return isValidURL(value);
            // return true;
          }
          return true;
        })
    })
  );
};
