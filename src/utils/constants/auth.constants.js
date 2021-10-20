import {hostName} from 'utils/helpers/environments.helpers';

const PREFIX = `__adnetwork_fe_${hostName}`;

export const TOKEN_KEY = `${PREFIX}_token__`;
export const REFRESH_TOKEN_KEY = `${PREFIX}_refresh_token__`;
export const USER_INFO_KEY = `${PREFIX}_user__`;

export const SYS_ADMIN_PARTNER = '00000000-0000-0000-0000-000000000000';
