import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const strategySchema = (isUpdate = false, t, isConcept = false) => {
  if (isConcept) {
    return yupResolver(
      Yup.object().shape({
        concept_uuids: Yup.array()
          .required(t('required'))
          .typeError(t('required'))
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      campaign_uuid: Yup.object().nullable().required(t('required')),
      strategy_type: Yup.object().nullable().required(t('required')),
      name: Yup.string().required(t('required')),
      start_time: Yup.date().required(t('required')).typeError(t('required')),
      end_time: Yup.date()
        .min(Yup.ref(`${'start_time'}`), "End date can't be before start date")
        .typeError(t('required')),
      click_commission: Yup.string()
        .nullable()
        .test('is-float', 'Invalid number', value =>
          (value + '').match(VALID_NUMBER)
        )
        .typeError('Invalid number'),
      inventories_bid: Yup.array()
        .of(
          Yup.object({
            uuid: Yup.string()
          })
        )
        .when('strategy_type', strategyType => {
          if (strategyType?.value === 'premium') {
            return Yup.array().required(t('required')).typeError(t('required'));
          }
          return Yup.array().nullable().notRequired();
        }),

      sources: Yup.array().required(t('required')).typeError(t('required')),
      position_uuids: Yup.array()
        .required(t('required'))
        .typeError(t('required')),
      schedule: Yup.object({
        week_days: Yup.array().required(t('required')).typeError(t('required'))
      })
    })
  );
};
