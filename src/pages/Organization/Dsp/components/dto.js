/**
 * Mapping API respone to form data format
 * @param {*} apiResp - API response data
 * @returns data with Form format trustly
 */
export const mappingApiToForm = ({apiResp}) => {};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData}) => {
  const {name, status, url, domains, credential} = formData;
  const destructureName = name?.trim() || '';
  const destructureUrl = url?.trim() || '';
  const desDomains = domains?.map(item => item.value) || null;

  return {
    name: destructureName,
    status,
    url: destructureUrl,
    credential,
    domains: desDomains
  };
};
