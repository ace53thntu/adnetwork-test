import {Controller, useFormContext} from 'react-hook-form';
import {
  FormFeedback,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';
import ReactDatePicker from 'react-datepicker';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function FormDatePicker(props) {
  const {name, defaultValue, label, minDate, showTimeSelect, required} = props;
  const {control, errors} = useFormContext();

  const hasError = errors?.[name]?.message ? true : false;

  return (
    <FormGroup>
      <Label>
        {required ? <span className="text-danger">*</span> : null}
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({onChange, onBlur, value, name, ref}) => {
          return (
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </InputGroupAddon>
              <ReactDatePicker
                shouldCloseOnSelect
                // isClearable
                showTimeSelect={showTimeSelect}
                selected={value}
                onChange={onChange}
                className={`form-control ${hasError && 'is-invalid'}`}
                minDate={minDate}
                dropdownMode="select"
              />
              {hasError && (
                <FormFeedback className="d-block">
                  {errors?.[name]?.message}
                </FormFeedback>
              )}
            </InputGroup>
          );
        }}
      />
    </FormGroup>
  );
}

FormDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  minDate: PropTypes.any,
  showTimeSelect: PropTypes.bool,
  required: PropTypes.bool
};
FormDatePicker.defaultProps = {
  minDate: new Date(),
  showTimeSelect: false,
  required: false
};
