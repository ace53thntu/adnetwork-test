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
  console.log(
    '🚀 ~ file: dto.js ~ line 14 ~ mappingFormToApi ~ formData',
    formData
  );
  const {name, status, url, domain, credential} = formData;
  const destructureName = name?.trim() || '';
  const destructureUrl = url?.trim() || '';

  return {
    name: destructureName,
    status,
    url: destructureUrl,
    credential,
    domain: domain?.value || ''
  };
};
