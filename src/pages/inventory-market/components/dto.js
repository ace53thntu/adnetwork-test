/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import moment from 'moment';
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
      [INPUTS_NAME.DEAL_PRICE]: deal_price ? parseFloat(deal_price) : 0
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
      [INPUTS_NAME.GLOBAL]: parseInt(global, 10),
      [INPUTS_NAME.DAILY]: parseInt(daily, 10)
    },
    [INPUTS_NAME.STATUS]: status,
    [INPUTS_NAME.HEADER_BIDDING]: header_bidding === 'active' ? true : false,
    [INPUTS_NAME.INVENTORY_UUID]: inventoryId
  };
};

export const mappingApiToForm = () => {};
