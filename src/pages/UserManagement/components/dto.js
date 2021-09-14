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
  console.log('🚀 ~ file: dto.js ~ line 14 ~ domainsArr', domainsArr);
  console.log('🚀 ~ file: dto.js ~ line 14 ~ countriesArr', countriesArr);
  const {
    uuid = '',
    name = '',
    status = 'active',
    domain = null,
    metadata = {}
  } = apiResp;
  //---> Get selected country
  const selectedCountry = countriesArr?.find(
    item => item?.value === metadata?.country
  );
  metadata.country = selectedCountry || null;
  const destructureDomain = domainsArr.find(item => item?.value === domain);
  return {
    uuid,
    name,
    status,
    domain: destructureDomain,
    metadata
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
