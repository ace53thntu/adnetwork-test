import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export const bannerFormValidationResolver = () => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Creative name is required.'),
      click_url: Yup.string().required('Required.'),
      // concept_id: isRequiredConcept
      //   ? Yup.object().required('Concept is required.').nullable()
      //   : Yup.object(),
      width: Yup.string()
        .required('Required.')
        .test(
          'isNumber',
          'Must be a positive integer number and greater than 0.',
          num => /^[1-9]\d*$/.test(num)
        ),
      height: Yup.string()
        .required('Required.')
        .test(
          'isNumber',
          'Must be a positive integer number and greater than 0.',
          num => /^[1-9]\d*$/.test(num)
        ),

      alternatives: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Required.'),
          file: Yup.object().nullable().required('Required.')
        })
      )
    })
  );
};
