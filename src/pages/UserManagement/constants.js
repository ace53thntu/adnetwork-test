import {capitalize} from 'utils/helpers/string.helpers';

export const INPUT_NAME = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  ORGANIZATION: 'organization',
  ROLE: 'role',
  LANGUAGE: 'language',
  AVATAR_URL: 'avatar_url',
  DSP_UUID: 'dsp_uuid',
  ADVERTISER_UUID: 'advertiser_uuid',
  PUBLISHER_UUID: 'publisher_uuid',
  STATUS: 'status'
};

export const USER_ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DSP: 'dsp',
  ADVERTISER: 'advertiser',
  PUBLISHER: 'publiser'
};

export const getUserRole = () => {
  return Object.values(USER_ROLE).map(item => ({
    value: item,
    label: capitalize(item)
  }));
};
