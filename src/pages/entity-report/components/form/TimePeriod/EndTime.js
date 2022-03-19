import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormGroup, Label} from 'reactstrap';

export function EndTime() {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();
  const startDate = useWatch({name: 'api.start_time', control});

  return (
    <FormGroup>
      <Label for="endDate" className="font-weight-bold">
        <span className="text-danger">*</span>
        {t('endDate')}
      </Label>
      <Controller
        control={control}
        name="api.end_time"
        render={({onChange, onBlur, value, name}) => (
          <ReactDatePicker
            selected={value}
            onChange={date => onChange(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            minDate={startDate}
            startDate={startDate}
            endDate={value}
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
