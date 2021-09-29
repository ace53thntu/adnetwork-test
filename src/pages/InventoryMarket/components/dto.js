/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import moment from 'moment';
import {INPUTS_NAME} from '../constants';

const convertDate = ({date, isStart = true}) => {
  const hour = isStart ? '00:00:00' : '23:59:59';
  try {
    const newDate = moment(date).format(`DD-MM-YYYY [${hour}]`);
    if (!newDate || newDate === 'Invalid date') {
      return null;
    }

    return newDate;
  } catch (error) {
    return null;
  }
};

export const mappingFormToApi = ({formData = {}, isDeal = true}) => {
  const {
    start_at,
    end_at,
    dsp_uuid,
    name,
    status,
    audience_uuid,
    deal_uuid,
    budget: {global, daily} = {}
  } = formData;
  const convertStartAt = convertDate({date: start_at});
  const convertEndAt = convertDate({date: end_at, isStart: false});

  if (isDeal) {
    //---> Case deal
    return {
      [INPUTS_NAME.START_AT]: convertStartAt,
      [INPUTS_NAME.END_AT]: convertEndAt,
      [INPUTS_NAME.DSP_UUID]: dsp_uuid?.value,
      [INPUTS_NAME.NAME]: name,
      [INPUTS_NAME.STATUS]: status
    };
  }

  //---> Case bid
  return {
    [INPUTS_NAME.START_AT]: convertStartAt,
    [INPUTS_NAME.END_AT]: convertEndAt,
    [INPUTS_NAME.DSP_UUID]: dsp_uuid?.value,
    [INPUTS_NAME.AUDICEN_UUID]: audience_uuid?.value,
    [INPUTS_NAME.DEAL_UUID]: deal_uuid?.value,
    [INPUTS_NAME.BUDGET]: {
      [INPUTS_NAME.GLOBAL]: parseInt(global, 10),
      [INPUTS_NAME.DAILY]: parseInt(daily, 10)
    },
    [INPUTS_NAME.STATUS]: status
  };
};

export const mappingApiToForm = () => {};
