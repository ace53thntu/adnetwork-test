import {convertGuiToApi} from 'utils/handleCurrencyFields';

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
  const {
    name,
    status,
    iabs,
    domains,
    tags,
    budget,
    impression,
    domain_groups_white,
    domain_groups_black,
    keywords_list_white,
    keywords_list_black
  } = formData;
  const desIABs = iabs?.map(item => item.value) || null;
  const desDomains = domains?.map(item => item.value) || null;
  const desTags = tags?.map(item => item.value) || null;

  let requestBody = {
    name,
    status,
    iabs: desIABs,
    domains: desDomains,
    tags: desTags,
    budget: {
      global: convertGuiToApi({value: budget?.global}),
      daily: convertGuiToApi({value: budget?.daily})
    },
    impression: {
      global: parseInt(impression?.global) || 0,
      daily: parseInt(impression?.daily)
    }
  };

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
      keyword => keyword?.value
    );
  }

  if (keywords_list_black && keywords_list_black?.length > 0) {
    requestBody.keywords_list_black = Array.from(
      keywords_list_black,
      keyword => keyword?.value
    );
  }

  return requestBody;
};
