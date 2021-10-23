import __get from 'lodash/get';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormFeedback, FormGroup, Label, Input as StrapInput} from 'reactstrap';

const FormTextInput = ({
  type = 'text',
  name,
  id,
  placeholder,
  label,
  isRequired,
  applyFieldArray,
  defaultValue,
  disable,
  disabled,
  style,
  ...rest
}) => {
  const {errors, register} = useFormContext();
  const errorMessage = __get(errors, `${name}.message`);

  return (
    <FormGroup>
      {label ? (
        <Label>
          {isRequired ? <span className="text-danger">*</span> : null}
          {label}
        </Label>
      ) : null}
      <StrapInput
        {...rest}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        name={name}
        innerRef={applyFieldArray ? register() : register}
        invalid={!!errorMessage}
        disabled={disable || disabled}
        style={style}
      />
      {!!errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </FormGroup>
  );
};

export default React.memo(FormTextInput);
