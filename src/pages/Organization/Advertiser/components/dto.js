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
  const {name, status, iabs, domains, tags} = formData;
  const desIABs = iabs?.map(item => item.value) || [];
  const desDomains = domains?.map(item => item.value) || [];
  const desTags = tags?.map(item => item.value) || [];

  return {
    name,
    status,
    iabs: desIABs,
    domains: desDomains,
    tags: desTags
  };
};
