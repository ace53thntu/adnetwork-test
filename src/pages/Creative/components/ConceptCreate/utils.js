import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export const createConceptResolver = () => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Creative name is required.')
    })
  );
};
