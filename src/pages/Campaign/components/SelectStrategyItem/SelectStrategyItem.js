//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';

const SelectStrategyItem = ({
  listOptions,
  viewOnly,
  t,
  currentStrategy,
  name,
  label,
  placeholder,
  isMulti = false,
  isRequired = false,
  defaultValue = null
}) => {
  const {setValue} = useFormContext();
  const {id: strategyId} = useParams();

  useEffect(() => {
    if (strategyId) {
      let currentValue = isMulti ? [] : null;
      if (defaultValue) {
        currentValue = defaultValue;
      }
      if (currentStrategy && currentStrategy[name]) {
        currentValue = currentStrategy[name];
      }
      setValue(name, currentValue);
    }
  }, [setValue, currentStrategy, name, isMulti, strategyId, defaultValue]);

  return (
    <FormReactSelect
      multiple={isMulti}
      name={name}
      label={label}
      placeholder={placeholder}
      options={listOptions}
      disabled={viewOnly}
      required={isRequired}
    />
  );
};

export default SelectStrategyItem;
