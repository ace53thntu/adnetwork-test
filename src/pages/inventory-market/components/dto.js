/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import moment from 'moment';
import {convertApiToGui, convertGuiToApi} from 'utils/handleCurrencyFields';
import {INPUTS_NAME} from '../constants';

const convertDate = ({date, isStart = true}) => {
  try {
    if (isStart && moment(date).isSame(moment(), 'day')) {
      return null;
    }
    const newDate = isStart
      ? moment(date).toISOString()
      : moment(date).endOf('day').toISOString();
    if (!newDate || newDate === 'Invalid date') {
      return null;
    }

    return newDate;
  } catch (error) {
    return null;
  }
};

export const mappingFormToApi = ({
  formData = {},
  isDeal = true,
  inventoryId = null
}) => {
  const {
    start_time,
    end_time,
    dsp_uuid,
    name,
    status,
    audience_list_uuid,
    deal_uuid,
    budget: {global, daily} = {},
    header_bidding
  } = formData;
  let convertStartAt = convertDate({date: start_time});
  const convertEndAt = convertDate({date: end_time, isStart: false});

  if (isDeal) {
    const {deal_price, limit_impression} = formData;
    //---> Case deal
    return {
      [INPUTS_NAME.INVENTORY_UUID]: inventoryId,
      [INPUTS_NAME.NAME]: name,
      [INPUTS_NAME.STATUS]: status,
      [INPUTS_NAME.START_AT]: convertStartAt,
      [INPUTS_NAME.END_AT]: convertEndAt,
      [INPUTS_NAME.DSP_UUID]: dsp_uuid?.value,
      [INPUTS_NAME.HEADER_BIDDING]: header_bidding === 'active' ? true : false,
      [INPUTS_NAME.LIMIT_IMPRESSION]: limit_impression
        ? parseInt(limit_impression, 10)
        : 0,
      [INPUTS_NAME.DEAL_PRICE]: convertGuiToApi({value: deal_price}) //deal_price ? parseFloat(deal_price) : 0
    };
  }

  //---> Case bid
  return {
    [INPUTS_NAME.START_AT]: convertStartAt,
    [INPUTS_NAME.END_AT]: convertEndAt,
    [INPUTS_NAME.DSP_UUID]: dsp_uuid?.value,
    [INPUTS_NAME.AUDIENCE_UUID]: audience_list_uuid?.value,
    [INPUTS_NAME.DEAL_UUID]: deal_uuid?.value,
    [INPUTS_NAME.BUDGET]: {
      [INPUTS_NAME.GLOBAL]: convertGuiToApi({value: global}), //parseInt(global, 10),
      [INPUTS_NAME.DAILY]: convertGuiToApi({value: daily}) //parseInt(daily, 10)
    },
    [INPUTS_NAME.STATUS]: status,
    [INPUTS_NAME.HEADER_BIDDING]: header_bidding === 'active' ? true : false,
    [INPUTS_NAME.INVENTORY_UUID]: inventoryId
  };
};

export const mappingApiToBidForm = (data = null) => {
  if (!data) {
    return {
      uuid: '',
      status: 'active',
      budget: {
        global: '',
        daily: ''
      },
      dsp_uuid: null,
      audience_list_uuid: [],
      start_time: new Date(),
      end_time: null
    };
  }
  const {
    dsp_uuid,
    dsp_name,
    audience_list_uuid,
    start_time,
    end_time,
    uuid = '',
    status,
    budget
  } = data;

  return {
    uuid,
    status,
    budget: {
      global: convertApiToGui({value: budget?.global}),
      daily: convertApiToGui({value: budget?.daily})
    },
    dsp_uuid: dsp_uuid ? {value: dsp_uuid, label: dsp_name} : null,
    audience_list_uuid: audience_list_uuid ? audience_list_uuid : [],
    start_time: start_time ? new Date(start_time) : new Date(),
    end_time: end_time ? new Date(end_time) : null
  };
};

export const mappingApiToDealForm = (data = null) => {
  if (!data) {
    return {
      uuid: '',
      status: 'active',
      header_bidding: 'inactive',
      limit_impression: '',
      deal_price: '',
      dsp_uuid: null,
      start_time: new Date(),
      end_time: null,
      name: ''
    };
  }
  const {
    dsp_uuid,
    dsp_name,
    start_time,
    end_time,
    uuid = '',
    status,
    header_bidding = 'inactive',
    limit_impression = '',
    deal_price = '',
    name = ''
  } = data;

  return {
    uuid,
    name,
    status,
    limit_impression,
    header_bidding,
    deal_price: convertApiToGui({value: deal_price}),
    dsp_uuid: dsp_uuid ? {value: dsp_uuid, label: dsp_name} : null,
    start_time: start_time ? new Date(start_time) : new Date(),
    end_time: end_time ? new Date(end_time) : null
  };
};
