import moment from 'moment';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';

const CAMPAIGN_ENTITY = {
  id: '',
  uuid: '',
  advertiser_uuid: null,
  name: '',
  status: 'active',
  start_time: null,
  end_time: null,
  check_visit: '',
  auto_realloc: ''
};

export const apiToForm = ({campaign = null}) => {
  if (campaign) {
    const {
      uuid: id,
      advertiser_uuid,
      advertiser_name,
      name,
      status = 'active',
      check_visit,
      auto_realloc
    } = campaign;

    let {start_time, end_time} = campaign;
    start_time = start_time ? new Date(start_time) : new Date();
    end_time = end_time ? new Date(end_time) : null;

    // Get advertiser selected
    const advertiser = advertiser_uuid
      ? {value: advertiser_uuid, label: advertiser_name}
      : null;
    return {
      uuid: id,
      id,
      advertiser_uuid: advertiser,
      name,
      status,
      start_time,
      end_time,
      check_visit: check_visit ? 'active' : 'inactive',
      auto_realloc: auto_realloc ? 'active' : 'inactive'
    };
  }

  return CAMPAIGN_ENTITY;
};

export const formToApi = formData => {
  const {
    advertiser_uuid,
    name,
    status,
    start_time,
    end_time,
    check_visit,
    auto_realloc
  } = formData;

  const formatStartDate = `${moment(start_time).format('DD-MM-YYYY')} 00:00:00`;
  const formaEndDate = `${moment(end_time).format('DD-MM-YYYY')} 23:59:59`;

  return {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser_uuid?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.STATUS]: status,
    [CAMPAIGN_KEYS.START_TIME]: formatStartDate,
    [CAMPAIGN_KEYS.END_TIME]: formaEndDate,
    [CAMPAIGN_KEYS.CHECK_VISIT]: check_visit === 'active' ? true : false,
    [CAMPAIGN_KEYS.AUTO_REALLOC]: auto_realloc === 'active' ? true : false
  };
};
