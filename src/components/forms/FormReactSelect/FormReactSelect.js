import __get from 'lodash/get';
import React, {useRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import Select from 'react-select';
import {FormFeedback, FormGroup, Label} from 'reactstrap';

function FormReactSelect({
  label,
  required = false,
  name,
  options = [],
  disabled = false,
  multiple = false,
  placeholder = 'Select...',
  optionLabelField = 'label',
  defaultValue = null,
  menuPlacement = 'bottom',
  isClearable = false,
  labelBold = false,
  ...rest
}) {
  const {errors, control} = useFormContext();

  const selectRef = useRef();

  const _renderErrorMessage = () => {
    const errorObj = __get(errors, name);

    return errorObj?.message ? (
      <FormFeedback className="d-block">{errors?.[name]?.message}</FormFeedback>
    ) : null;
  };

  const _getBorderColor = styles => {
    const errorObj = __get(errors, name);
    return errorObj?.message ? '#dc3545' : styles.borderColor;
  };

  return (
    <>
      <FormGroup>
        {label && (
          <Label for="" className={labelBold ? 'font-weight-bold' : ''}>
            {required && <span className="text-danger"> *</span>}
            {label}
          </Label>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          onFocus={() => selectRef.current?.select?.focus()}
          render={({value, onChange, onBlur}) => {
            return (
              <Select
                ref={ref => (selectRef.current = ref)}
                isDisabled={disabled}
                isMulti={multiple}
                options={options}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                styles={{
                  menu: styles => ({...styles, zIndex: 999}),
                  control: styles => {
                    return {
                      ...styles,
                      borderColor: _getBorderColor(styles)
                    };
                  }
                }}
                menuPlacement={menuPlacement}
                isClearable={isClearable}
              />
            );
          }}
        />
        {_renderErrorMessage()}
      </FormGroup>
    </>
  );
}

export default FormReactSelect;
