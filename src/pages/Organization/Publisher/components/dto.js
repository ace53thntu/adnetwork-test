/**
 * @function mappingApiToForm
 * @description Mapping API respone to form data format
 * @param {Objecy} apiResp - API response data
 * @param {Array} domainsArr - List of domains
 * @param {Array} countriesArr - List of Countries
 * @returns data with Form format trustly
 */
export const mappingApiToForm = ({apiResp = {}}) => {
  const {uuid = '', name = '', status = 'active', domain} = apiResp;
  //---> Get selected country

  return {
    uuid,
    name,
    status,
    domain
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
