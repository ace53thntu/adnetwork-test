import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const strategyFormValidation = (isUpdate = false) => {
  return yupResolver(
    Yup.object().shape({
      campaign_id: Yup.object().nullable().required('This field is required'),
      name: Yup.string().required('This field is required'),
      engine_configuration: Yup.object({
        max: Yup.number()
          .min(0)
          .when('engine', (value, schema) => {
            if (value?.value === 'CPM_REACH') {
              return schema.max(1000000);
            } else {
              return schema;
            }
          })
          .required('Required.')
          .typeError('This field is required'),
        num_impressions: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        target: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        cpx_min: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        value: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        threshold: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        discovery_bid_price: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        kpi: Yup.object()
          .nullable()
          .required('Required.')
          .typeError('This field is required'),
        bidding_method: Yup.object()
          .nullable()
          .required('Required.')
          .typeError('This field is required')
      }),
      engine_configuration_first_price: Yup.object({
        max: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        num_impressions: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        target: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        cpx_min: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        value: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        threshold: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        discovery_bid_price: Yup.number()
          .required('Required.')
          .typeError('This field is required'),
        kpi: Yup.object()
          .nullable()
          .required('Required.')
          .typeError('This field is required'),
        bidding_method: Yup.object()
          .nullable()
          .required('Required.')
          .typeError('This field is required')
      }),
      engine_first_price: Yup.object()
        .nullable()
        .required('This field is required'),
      engine: Yup.object().nullable().required('This field is required')
    })
  );
};
