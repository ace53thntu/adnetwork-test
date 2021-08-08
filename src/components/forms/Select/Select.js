import __get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import ReactSelect from 'react-select';
import {FormFeedback, FormGroup, Label} from 'reactstrap';

function Select(props) {
  const {
    label,
    required,
    name,
    options,
    disabled,
    multiple,
    placeholder,
    defaultValue,
    menuPlacement
  } = props;

  const {errors, control} = useFormContext();

  const selectRef = React.useRef();

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
          <Label for="">
            {label}
            {required && <span className="text-danger"> *</span>}
          </Label>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          onFocus={() => selectRef.current?.select?.focus()}
          render={({value, onChange, onBlur}) => {
            return (
              <ReactSelect
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
              />
            );
          }}
        />
        {_renderErrorMessage()}
      </FormGroup>
    </>
  );
}

Select.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  menuPlacement: PropTypes.string
};
Select.defaultProps = {
  label: null,
  required: false,
  options: [],
  disabled: false,
  multiple: false,
  placeholder: 'Select...',
  defaultValue: null,
  menuPlacement: 'bottom'
};

export {Select};
