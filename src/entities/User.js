import {LANG_OPTIONS} from 'constants/misc';

export const mappingProfileFormToApi = ({formData = {}, userData}) => {
  console.log(
    '🚀 ~ file: User.js ~ line 4 ~ mappingProfileFormToApi ~ userData',
    userData
  );

  const {
    uuid,
    first_name = '',
    last_name = '',
    language,
    email = 'thinhtstpsps@gmail.com'
  } = formData;
  const {organization = '', role = '', status = '', avatar_url = ''} = userData;
  return {
    uuid,
    first_name,
    last_name,
    language: language?.value ?? false,
    email,
    organization,
    role,
    status,
    avatar_url
  };
};

export const mappingProfileApiToForm = ({apiRes = {}}) => {
  const {uuid, first_name, last_name, language, email} = apiRes;
  const languageSelected = LANG_OPTIONS.find(
    langItem => langItem?.value === language
  );

  return {
    uuid,
    first_name,
    last_name,
    language: languageSelected,
    email
  };
};
