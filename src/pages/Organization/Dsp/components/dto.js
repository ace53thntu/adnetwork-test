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
    domain = dspData?.domain
      ? {
          value: dspData?.domain,
          label: dspData?.domain
        }
      : null;
    // TODO: Update list domains.

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
export const mappingFormToApi = ({formData}) => {
  const {
    name,
    status,
    bidding_url,
    domain,
    credential,
    budget,
    header_bidding_available,
    priority
  } = formData;
  const destructureName = name?.trim() || '';
  const destructureUrl = bidding_url?.trim() || '';
  const daily = parseFloat(budget.daily) || 0;
  const global = parseFloat(budget.global) || 0;

  return {
    name: destructureName,
    status,
    bidding_url: destructureUrl,
    credential,
    domain: domain?.value || '',
    budget: {
      daily,
      global
    },
    header_bidding_available:
      header_bidding_available === 'active' ? true : false,
    priority: parseInt(priority, 10) || 0
  };
};
