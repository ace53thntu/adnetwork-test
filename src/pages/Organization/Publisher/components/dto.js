/**
 * @function mappingApiToForm
 * @description Mapping API respone to form data format
 * @param {Objecy} apiResp - API response data
 * @param {Array} domainsArr - List of domains
 * @param {Array} countriesArr - List of Countries
 * @returns data with Form format trustly
 */
export const mappingApiToForm = ({
  apiResp = {},
  domainsArr = [],
  countriesArr = []
}) => {
  const {
    uuid = '',
    name = '',
    status = 'active',
    domains = null,
    metadata = {}
  } = apiResp;
  //---> Get selected country
  const selectedCountry = countriesArr?.find(
    item => item?.value === metadata?.country
  );
  metadata.country = selectedCountry || null;

  return {
    uuid,
    name,
    status,
    domains,
    metadata
  };
};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData}) => {
  const {name, status, domains, metadata} = formData;
  const desDomains = domains?.value || '';
  metadata.country = metadata?.country?.value || '';
  return {
    name,
    status,
    domains: desDomains,
    metadata
  };
};
