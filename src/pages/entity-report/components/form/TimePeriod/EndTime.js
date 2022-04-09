//---> Build-in Modules
import React from 'react';

//---> External Modules
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormGroup, Label} from 'reactstrap';

//---> Internal Modules
import {REPORT_INPUT_NAME} from 'constants/report';

export function EndTime() {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();
  const startDate = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`,
    control
  });

  return (
    <FormGroup>
      <Label for="endDate" className="font-weight-bold">
        <span className="text-danger">*</span>
        {t('endDate')}
      </Label>
      <Controller
        control={control}
        name={`${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.END_TIME}`}
        render={({onChange, onBlur, value, name}) => (
          <ReactDatePicker
            selected={value}
            onBlur={onBlur}
            onChange={date => onChange(date)}
            className="form-control"
            placeholderText="dd/mm/yyyy HH:mm"
            name={name}
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy HH:mm"
            timeFormat="HH:mm"
            minDate={startDate}
            popperPlacement="top-end"
            showTimeInput
            showTimeSelect
            selectsEnd
          />
        )}
      />
      {errors && errors['api']?.['end_time'] ? (
        <div className="invalid-feedback d-block">
          {errors['api']?.['end_time']?.message}
        </div>
      ) : null}
    </FormGroup>
  );
}
