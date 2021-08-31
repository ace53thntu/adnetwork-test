import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {CAMPAIGN_KEYS} from '../../constants';

export const validationCampaign = t => {
  return yupResolver(
    yup.object().shape({
      advertiser: yup.object().typeError('Required!'),
      name: yup.string().required('Required!'),
      [CAMPAIGN_KEYS.START_TIME]: yup.date().required(t('required')),
      [CAMPAIGN_KEYS.END_TIME]: yup
        .date()
        .min(
          yup.ref(`${CAMPAIGN_KEYS.START_TIME}`),
          "End date can't be before start date"
        )
    })
  );
};
