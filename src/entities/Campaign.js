import moment from 'moment';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import {convertGuiToApi} from 'utils/handleCurrencyFields';
import {getListCurrency} from 'utils/helpers/getListCurrency';
import {getListTimeZone} from 'utils/helpers/getListTimezone';

const CAMPAIGN_ENTITY = {
  id: '',
  uuid: '',
  advertiser_uuid: null,
  name: '',
  status: 'active',
  start_time: new Date(),
  end_time: null,
  time_zone: {value: '+7', label: 'UTC+7'},
  currency: {value: 'USD', label: 'US Dollar (USD)'}
};

export const apiToForm = ({campaign = null, advertiser = null}) => {
  if (campaign) {
    const {
      uuid: id,
      advertiser_uuid,
      advertiser_name,
      name,
      status = 'active',
      time_zone = '+7',
      currency = 'usd'
    } = campaign;

    let {start_time, end_time} = campaign;
    start_time = start_time ? new Date(start_time) : new Date();
    end_time = end_time ? new Date(end_time) : null;

    // Get advertiser selected
    let advertiserDestructured = null;

    advertiserDestructured = advertiser_uuid
      ? {value: advertiser_uuid, label: advertiser_name}
      : null;
    return {
      uuid: id,
      id,
      advertiser_uuid: advertiserDestructured,
      name,
      status,
      start_time,
      end_time,
      time_zone: getListTimeZone().find(item => item.value === time_zone),
      currency: getListCurrency().find(item => item.value === currency)
    };
  }

  let advertiserDestructured = null;
  if (advertiser) {
    advertiserDestructured =
      {value: advertiser.uuid, label: advertiser.name} || null;
  }
  return {...CAMPAIGN_ENTITY, advertiser_uuid: advertiserDestructured};
};

export const formToApi = (formData, isCreate = false) => {
  const {
    advertiser_uuid,
    name,
    status,
    start_time,
    end_time,
    budget,
    impression,
    domain_groups_white,
    domain_groups_black,
    keywords_list_white,
    keywords_list_black,
    time_zone,
    currency
  } = formData;
  console.log('🚀 ~ file: Campaign.js ~ line 78 ~ currency', currency);
  console.log('🚀 ~ file: Campaign.js ~ line 78 ~ time_zone', time_zone);

  let formatStartDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const formaEndDate = moment(end_time).endOf('day').toISOString();

  // Set start time is null if start time < now
  if (moment(start_time).isBefore(moment(), 'day')) {
    formatStartDate = null;
  }

  let requestBody = {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser_uuid?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.STATUS]: status,
    [CAMPAIGN_KEYS.START_TIME]: formatStartDate,
    [CAMPAIGN_KEYS.END_TIME]: formaEndDate,

    [CAMPAIGN_KEYS.TIMEZONE]: time_zone?.value || '',
    [CAMPAIGN_KEYS.CURRENCY]: currency?.value || ''
  };

  if (isCreate) {
    requestBody = {
      ...requestBody,
      [CAMPAIGN_KEYS.BUDGET]: {
        global: convertGuiToApi({value: budget?.global}), //parseFloat(budget?.global) || 0,
        daily: convertGuiToApi({value: budget?.daily}) //parseFloat(budget?.daily)
      },
      [CAMPAIGN_KEYS.IMPRESSION]: {
        global: parseInt(impression?.global) || null,
        daily: parseInt(impression?.daily) || null
      }
    };
  }

  //---> Remove [key] before calling API if do not value
  if (!requestBody?.budget?.global) {
    delete requestBody?.budget?.global;
  }

  if (!requestBody?.budget?.daily) {
    delete requestBody?.budget?.daily;
  }

  if (!requestBody?.impression?.global) {
    delete requestBody?.impression?.global;
  }

  if (!requestBody?.impression?.daily) {
    delete requestBody?.impression?.daily;
  }

  if (domain_groups_white && domain_groups_white?.length > 0) {
    requestBody.domain_groups_white = Array.from(
      domain_groups_white,
      domain => domain?.value
    );
  }

  if (domain_groups_black && domain_groups_black?.length > 0) {
    requestBody.domain_groups_black = Array.from(
      domain_groups_black,
      domain => domain?.value
    );
  }

  if (keywords_list_white && keywords_list_white?.length > 0) {
    requestBody.keywords_list_white = Array.from(
      keywords_list_white,
      domain => domain?.value
    );
  }

  if (keywords_list_black && keywords_list_black?.length > 0) {
    requestBody.keywords_list_black = Array.from(
      keywords_list_black,
      domain => domain?.value
    );
  }

  return requestBody;
};
