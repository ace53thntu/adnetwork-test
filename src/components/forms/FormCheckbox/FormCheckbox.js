import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormGroup, CustomInput} from 'reactstrap';

function FormCheckbox({name, label, disabled = false}) {
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
          innerRef={register}
          invalid={errors?.[name]?.message ? true : false}
        />
      </div>
    </FormGroup>
  );
}

export default FormCheckbox;
