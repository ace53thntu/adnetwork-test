import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {CAMPAIGN_KEYS} from '../../constants';

export const validationCampaign = t => {
  return yupResolver(
    yup.object().shape({
      advertiser: yup.object().typeError('Required!'),
      name: yup.string().required('Required!'),
      cpi: yup.string().required('Required!'),
      cpc: yup.string().required('Required!'),
      cpcc: yup.string().required('Required!'),
      cpvc: yup.string().required('Required!'),
      cplpc: yup.string().required('Required!'),
      cplpv: yup.string().required('Required!'),
      compc: yup.string().required('Required!'),
      compv: yup.string().required('Required!'),
      [CAMPAIGN_KEYS.MEDIA_COST]: yup.string().required('Required!'),
      [CAMPAIGN_KEYS.TRACKING_COST]: yup.string().required('Required!'),
      [CAMPAIGN_KEYS.START_TIME]: yup.date().required(t('required')),
      [CAMPAIGN_KEYS.END_TIME]: yup
        .date()
        .min(
          yup.ref(`${CAMPAIGN_KEYS.START_TIME}`),
          "End date can't be before start date"
        ),
      conv_event_ids: yup
        .array()
        .of(
          yup.object({
            value: yup.number(),
            label: yup.string()
          })
        )
        .required('Required!')
        .typeError('Required!'),
      conv_label_ids: yup
        .array()
        .of(
          yup.object({
            value: yup.number(),
            label: yup.string()
          })
        )
        .required('Required!')
        .typeError('Required!')
    })
  );
};
