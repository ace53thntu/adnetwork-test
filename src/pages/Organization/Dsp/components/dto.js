import {convertGuiToApi} from 'utils/handleCurrencyFields';

/**
 * Mapping API response to form data format
 * @param {*} apiResp - API response data
 * @returns data with Form format trustly
 */
export const mappingApiToForm = ({dspData}) => {
  let name = '',
    status = 'active',
    bidding_url = '',
    credential = {},
    domain = null,
    budget,
    header_bidding_available,
    priority;

  if (Object.keys(dspData).length > 0) {
    name = dspData?.name;
    status = dspData?.status;
    bidding_url = dspData?.bidding_url;
    //---> Destructure Domains selected.
    domain = dspData?.domain;
    credential = dspData?.credential;
    budget = dspData?.budget;
    header_bidding_available = dspData?.header_bidding_available
      ? 'active'
      : 'inactive';
    priority = dspData?.priority;
  }

  return {
    name,
    status,
    bidding_url,
    credential,
    domain,
    budget,
    header_bidding_available,
    priority
  };
};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData, isEdit}) => {
  const {
    name,
    status,
    bidding_url,
    domain,
    credential,
    header_bidding_available,
    priority
  } = formData;
  const destructureName = name?.trim() || '';
  const destructureUrl = bidding_url?.trim() || '';

  const returnData = {
    name: destructureName,
    status,
    bidding_url: destructureUrl,
    credential,
    domain,
    header_bidding_available:
      header_bidding_available === 'active' ? true : false,
    priority: parseInt(priority, 10) || 0
  };

  if (!isEdit) {
    const daily = convertGuiToApi({value: formData?.budget?.daily});
    const global = convertGuiToApi({value: formData?.budget?.global});
    const budget = {
      daily,
      global
    };
    returnData.budget = budget;
  }

  return returnData;
};
