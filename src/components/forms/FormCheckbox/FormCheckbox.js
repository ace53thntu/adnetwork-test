import React from 'react';
import {useFormContext} from 'react-hook-form';
import {CustomInput, FormGroup} from 'reactstrap';

function FormCheckbox({
  name,
  label,
  disabled = false,
  applyFieldArray = false
}) {
  const {register, errors} = useFormContext();

  return (
    <FormGroup>
      <div>
        <CustomInput
          type="checkbox"
          id={name}
          name={name}
          label={label}
          disabled={disabled}
          innerRef={applyFieldArray ? register() : register}
          invalid={errors?.[name]?.message ? true : false}
        />
      </div>
    </FormGroup>
  );
}

export default FormCheckbox;
