import {CAPPING_TYPE} from 'constants/capping';

/**
 * Mapping Form data to API request body format
 * @param {object} formData - API response data
 * @return Object - data with API request body format trustly
 */
export const mappingFormToApi = ({formData = {}, strategyId}) => {
  let {
    week_day,
    start_hour,
    start_minute,
    end_hour,
    end_minute,
    is_gmt,
    status
  } = formData;
  week_day = week_day.map(item => item.value)?.toString();
  start_hour = parseInt(start_hour, 10);
  start_minute = parseInt(start_minute, 10);
  end_hour = parseInt(end_hour, 10);
  end_minute = parseInt(end_minute, 10);
  const convertGmt = is_gmt === 'active' ? true : false;

  return {
    week_day,
    start_hour,
    start_minute,
    end_hour,
    end_minute,
    strategy_uuid: strategyId,
    is_gmt: convertGmt,
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
