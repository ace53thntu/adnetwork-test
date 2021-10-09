//---> Build-in modules
import React from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import {INPUTS_NAME} from 'pages/InventoryMarket/constants';

export default function EndAt({excludeDates = []}) {
  const {control, watch} = useFormContext();
  const startDate = watch(INPUTS_NAME.START_AT);

  return (
    <Controller
      control={control}
      name={INPUTS_NAME.END_AT}
      render={({onChange, onBlur, value, name}) => (
        <DatePicker
          selected={value}
          onChange={date => onChange(date)}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          startDate={startDate}
          endDate={value}
          selectsEnd
          minDate={startDate}
          excludeDates={excludeDates}
        />
      )}
    />
  );
}
