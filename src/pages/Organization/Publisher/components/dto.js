/**
 * @function mappingApiToForm
 * @description Mapping API response to form data format
 * @param {Object} apiResp - API response data
 * @param {Array} domainsArr - List of domains
 * @param {Array} countriesArr - List of Countries
 * @returns data with Form format trustly
 */
export const mappingApiToForm = ({apiResp = {}}) => {
  if (apiResp) {
    const {uuid = '', name = '', status = 'active', domain} = apiResp;
    //---> Get selected country

    return {
      uuid,
      name,
      status,
      domain
    };
  }
  return {
    uuid: '',
    name: '',
    status: 'active',
    domain: null
  };
};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData}) => {
  const {name, status, domain} = formData;
  return {
    name,
    status,
    domain
  };
};
