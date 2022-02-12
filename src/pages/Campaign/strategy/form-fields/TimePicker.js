// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {Controller, useFormContext} from 'react-hook-form';
import {Label} from 'reactstrap';
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool
};

const TimePicker = ({
  name = '',
  label = '',
  required = false,
  minTime = null
}) => {
  const {control} = useFormContext();

  return (
    <div>
      <Label>
        {required && <RequiredLabelPrefix />}
        {label}
      </Label>
      <div>
        <Controller
          control={control}
          name={name}
          render={({onChange, onBlur, value, name: nameControl}) => (
            <DatePicker
              selected={value}
              onBlur={onBlur}
              onChange={date => onChange(date)}
              className="form-control"
              placeholderText="HH:mm"
              name={nameControl}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              showTimeInput
              minTime={minTime}
            />
          )}
        />
      </div>
    </div>
  );
};

TimePicker.propTypes = propTypes;

export default TimePicker;
