import {CAPPING_TYPE} from '../constants';

/**
 * Mapping Form data to API request body format
 * @param {object} formData - API response data
 * @return Object - data with API request body format trustly
 */
export const mappingFormToApi = ({formData = {}, strategyId}) => {
  const {ctype, time_frame, climit, smooth, status} = formData;
  const ctypeValue = ctype?.value ?? '';
  const timeFrameValue = parseInt(time_frame, 10) ?? null;
  const climitValue = parseInt(climit, 10) ?? null;
  const smoothValue = smooth === 'active' ? true : false;

  return {
    strategy_uuid: strategyId,
    ctype: ctypeValue,
    time_frame: timeFrameValue,
    climit: climitValue,
    smooth: smoothValue,
    status
  };
};

/**
 * Mapping API respone to form data format
 * @param {object} apiResp - API response data
 * @return Object - data with Form format trustly
 */
export const mappingApiToForm = ({apiResp = {}}) => {
  let uuid = '',
    ctype = null,
    time_frame = 0,
    climit = 0,
    smooth = 'active';

  if (apiResp) {
    uuid = apiResp?.uuid;
    ctype = apiResp?.ctype;
    ctype = CAPPING_TYPE.find(item => item.value === ctype);

    time_frame = apiResp?.time_frame;
    climit = apiResp?.climit;
    smooth = apiResp?.smooth ? 'active' : 'inactive';
  }

  return {uuid, ctype, time_frame, climit, smooth};
};
