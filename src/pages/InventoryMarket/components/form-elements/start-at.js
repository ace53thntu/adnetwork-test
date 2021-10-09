/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import {INPUTS_NAME} from '../../constants';

const StartAt = ({excludeDates = []}) => {
  const {control, register, watch} = useFormContext();
  const endDate = watch(INPUTS_NAME.END_AT);

  React.useEffect(() => {
    register([INPUTS_NAME.START_AT]);
  }, [register]);

  return (
    <Controller
      control={control}
      name={INPUTS_NAME.START_AT}
      render={({onChange, onBlur, value, name}) => (
        <DatePicker
          selected={value}
          onChange={date => onChange(date)}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          startDate={value}
          endDate={endDate}
          selectsStart
          minDate={new Date()}
          excludeDates={excludeDates}
        />
      )}
    />
  );
};

export default StartAt;
