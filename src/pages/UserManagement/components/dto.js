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
  languagesArr = [],
  rolesArr = [],
  advertisersArr = [],
  dspsArr = [],
  publishersArr = []
}) => {
  const {
    uuid = '',
    username = '',
    email = '',
    language = null,
    role = null,
    status = 'active',
    publisher_uuid = '',
    dsp_uuid = '',
    advertiser_uuid = '',
    password = ''
  } = apiResp;
  const foundLanguage =
    languagesArr?.find(item => item.value === language) || null;
  const foundRole = rolesArr?.find(item => item.value === role) || null;
  const foundPublisher =
    publishersArr?.find(item => item.value === publisher_uuid) || null;
  const foundAdvertiser =
    advertisersArr?.find(item => item.value === advertiser_uuid) || null;
  const foundDsp = dspsArr?.find(item => item.value === dsp_uuid) || null;

  return {
    uuid,
    username,
    password,
    email,
    language: foundLanguage,
    role: foundRole,
    status,
    dsp_uuid: foundDsp,
    advertiser_uuid: foundAdvertiser,
    publisher_uuid: foundPublisher
  };
};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData = {}}) => {
  const {
    username = '',
    email = '',
    password = '',
    organization = '',
    role = null,
    language = '',
    avatar_url = '',
    dsp_uuid = '',
    advertiser_uuid = '',
    publisher_uuid = ''
  } = formData;

  return {
    username,
    email,
    password,
    organization,
    role: role?.value,
    language: language?.value,
    avatar_url,
    dsp_uuid: dsp_uuid?.value,
    advertiser_uuid: advertiser_uuid?.value,
    publisher_uuid: publisher_uuid?.value
  };
};
