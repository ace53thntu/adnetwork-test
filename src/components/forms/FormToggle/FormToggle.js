import React, {useCallback, useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

import Toggle from '../Toggle';

function FormToggle({
  name,
  label,
  values = {
    checked: '',
    unChecked: ''
  },
  defaultCheckedValue,
  disabled = false,
  inline = true,
  ...rest
}) {
  const {register, setValue, watch} = useFormContext();

  const currentValue = watch(name);

  const [isChecked, setIsChecked] = useState(currentValue === values?.checked);

  useEffect(() => {
    register({name});
  }, [name, register]);

  const onHandleToggle = useCallback(() => {
    if (isChecked) {
      setValue(name, values.unChecked, {
        shouldDirty: true,
        shouldValidate: true
      });
    } else {
      setValue(name, values.checked, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
    setIsChecked(!isChecked);
  }, [isChecked, name, setValue, values.checked, values.unChecked]);

  return (
    <Toggle
      checked={isChecked}
      onChange={onHandleToggle}
      label={label}
      disabled={disabled}
      inline={inline}
      {...rest}
    />
  );
}

export default FormToggle;
