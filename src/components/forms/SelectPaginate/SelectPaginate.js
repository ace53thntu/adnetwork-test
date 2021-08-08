import __get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import Select from 'react-select';
import {withAsyncPaginate} from 'react-select-async-paginate';
import {FormFeedback, FormGroup, Label} from 'reactstrap';

const CustomAsyncPaginate = withAsyncPaginate(function CustomSelect({
  inputRef,
  ...props
}) {
  return <Select ref={ref => (inputRef.current = ref)} {...props} />;
});

function SelectPaginate(props) {
  const {
    label,
    required = false,
    name,
    disabled = false,
    multiple = false,
    placeholder = 'Select...',
    optionLabelField = 'label',
    defaultValue = null,
    loadOptions,
    additional = {
      page: 1
    },
    ...rest
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
              <CustomAsyncPaginate
                {...rest}
                inputRef={selectRef}
                isDisabled={disabled}
                isMulti={multiple}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                getOptionLabel={opts => opts[optionLabelField]}
                getOptionValue={opts => opts.value}
                styles={{
                  menu: styles => ({...styles, zIndex: 999}),
                  control: styles => {
                    return {
                      ...styles,
                      borderColor: _getBorderColor(styles)
                    };
                  }
                }}
                loadOptions={loadOptions}
                debounceTimeout={500}
                additional={additional}
                closeMenuOnSelect={!multiple}
              />
            );
          }}
        />

        {_renderErrorMessage()}
      </FormGroup>
    </>
  );
}

SelectPaginate.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  optionLabelField: PropTypes.string,
  defaultValue: PropTypes.any,
  loadOptions: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    page: PropTypes.number
  })
};
SelectPaginate.defaultProps = {
  label: null,
  required: false,
  disabled: false,
  multiple: false,
  placeholder: 'Select...',
  optionLabelField: 'label',
  defaultValue: null,
  additional: {
    page: 1
  }
};

export {SelectPaginate};
