import {CustomInput, FormGroup, Label} from 'reactstrap';

import React from 'react';
import {useFormContext} from 'react-hook-form';

function FormRadioGroup({
  inline = false,
  label,
  items = [],
  disabled = false,
  defaultValue,
  name
}) {
  const {register} = useFormContext();

  return (
    <FormGroup inline={inline}>
      {label ? <Label for="">{label}</Label> : null}

      <div>
        {items.map(({label, id, value}) => (
          <CustomInput
            key={id}
            inline={inline}
            type="radio"
            name={name}
            label={label}
            id={id}
            innerRef={register}
            value={value}
            disabled={disabled}
            defaultChecked={defaultValue === value}
          />
        ))}
      </div>
    </FormGroup>
  );
}

export default React.memo(FormRadioGroup);
