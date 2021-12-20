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
  rolesArr = []
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
    password = '',
    publisher_name = '',
    advertiser_name = '',
    dsp_name = '',
    company = ''
  } = apiResp;
  const foundLanguage =
    languagesArr?.find(item => item.value === language) || null;
  const foundRole = rolesArr?.find(item => item.value === role) || null;
  const foundPublisher = publisher_uuid
    ? {value: publisher_uuid, label: publisher_name}
    : null;
  const foundAdvertiser = advertiser_uuid
    ? {value: advertiser_uuid, label: advertiser_name}
    : null;
  const foundDsp = dsp_uuid ? {value: dsp_uuid, label: dsp_name} : null;

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
    publisher_uuid: foundPublisher,
    company
  };
};

/**
 * Mapping Form data to API request body format
 * @param {*} formData - API response data
 * @returns data with API request body format trustly
 */
export const mappingFormToApi = ({formData = {}, isEdit = false}) => {
  const {
    username = '',
    email = '',
    password = '',
    company = '',
    role = null,
    language = '',
    avatar_url = '',
    dsp_uuid = '',
    advertiser_uuid = '',
    publisher_uuid = '',
    status
  } = formData;
  const data = {
    username,
    password,
    email,
    status,
    company,
    role: role?.value,
    language: language?.value,
    avatar_url,
    dsp_uuid: dsp_uuid?.value,
    advertiser_uuid: advertiser_uuid?.value,
    publisher_uuid: publisher_uuid?.value
  };

  if (isEdit) {
    delete data.password;
  }

  return data;
};
