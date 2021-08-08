import {isDev} from 'utils/helpers/environments.helpers';

const PREFIX = '__adnetwork_fe';

export const TOKEN_KEY = isDev ? `${PREFIX}_token_dev__` : `${PREFIX}_token__`;
export const REFRESH_TOKEN_KEY = isDev
  ? `${PREFIX}_refresh_token_dev__`
  : `${PREFIX}_refresh_token__`;
export const USER_INFO_KEY = isDev
  ? `${PREFIX}_user_dev__`
  : `${PREFIX}_user__`;

export const SYS_ADMIN_PARTNER = '00000000-0000-0000-0000-000000000000';
