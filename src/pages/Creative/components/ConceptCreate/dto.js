import moment from 'moment';

export const createConceptModelToRepo = (raw, advertiserId) => {
  const {name, startTime, endTime, status} = raw;

  let result = {
    name,
    status: status ? 'active' : 'inactive',
    advertiser_uuid: advertiserId,
    start_time: moment(startTime).toISOString()
  };
  if (endTime) {
    result = {
      ...result,
      end_time: moment(endTime).endOf('day').toISOString()
    };
  }
  return result;
};

export const conceptRepoToModel = raw => {
  const {name, start_time, end_time, status} = raw;

  let result = {
    name,
    status: status === 'active' ? true : false,
    startTime: new Date(start_time),
    endTime: null
  };

  if (end_time) {
    const date = moment(end_time);
    if (date.isValid()) {
      result = {
        ...result,
        endTime: new Date(end_time)
      };
    }
  }

  return result;
};
