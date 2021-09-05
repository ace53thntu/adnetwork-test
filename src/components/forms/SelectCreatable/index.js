import React, {useCallback, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import __isFunction from 'lodash/isFunction';
import {FormGroup, Label, FormFeedback} from 'reactstrap';

const createOption = (id, labelValue = 'optionLabel') => ({
  label: labelValue,
  value: id,
  id
});

const SelectCreatable = ({
  data = [],
  labelKey = 'label',
  onCreate = null,
  selectedValues = [],
  setFormValue,
  name,
  placeholder,
  label,
  required,
  errors
}) => {
  const defaultOptions = Array.from(data).map(item =>
    createOption(item.id, item[labelKey])
  );

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(selectedValues);

  React.useEffect(() => {
    setValue(selectedValues);
  }, [selectedValues]);

  const handleChange = newValue => {
    setValue(newValue);
    setFormValue(name, newValue, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  const handleCreate = useCallback(
    inputValue => {
      if (__isFunction(onCreate)) {
        onCreate({
          inputValue,
          setIsLoading,
          createOption,
          setOptions,
          setValue,
          options,
          selected: value
        });
      }
    },
    [onCreate, options, value]
  );

  return (
    <>
      <FormGroup>
        {label && (
          <Label for="">
            {required && <span className="text-danger">*</span>}
            {label}
          </Label>
        )}
        <CreatableSelect
          isClearable
          isMulti
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={handleChange}
          options={options}
          value={value}
          onCreateOption={handleCreate}
          placeholder={placeholder}
          styles={{
            menu: styles => ({...styles, zIndex: 999}),
            control: styles => {
              return {
                ...styles,
                borderColor: errors?.[name]?.message
                  ? '#dc3545'
                  : styles.borderColor
              };
            }
          }}
        />
        {errors?.[name]?.message ? (
          <FormFeedback className="d-block">
            {errors?.[name]?.message}
          </FormFeedback>
        ) : null}
      </FormGroup>
    </>
  );
};

export default SelectCreatable;
