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
        name="api.start_time"
        render={({onChange, onBlur, value, name}) => (
          <ReactDatePicker
            selected={value}
            onChange={date => onChange(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
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
