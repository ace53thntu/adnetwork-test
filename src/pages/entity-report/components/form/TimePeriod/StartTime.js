import {REPORT_INPUT_NAME} from 'constants/report';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormGroup, Label} from 'reactstrap';

export default function StartTime() {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();

  return (
    <FormGroup>
      <Label for="startDate" className="font-weight-bold">
        <span className="text-danger">*</span>
        {t('startDate')}
      </Label>
      <Controller
        control={control}
        name={`${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`}
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
            popperPlacement="top-end"
            showTimeInput
            showTimeSelect
          />
        )}
      />
      {errors && errors['api']?.['start_time'] ? (
        <div className="invalid-feedback d-block">
          {errors['api']?.['start_time']?.message}
        </div>
      ) : null}
    </FormGroup>
  );
}
