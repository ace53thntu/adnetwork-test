import PropTypes from 'prop-types';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {CustomInput, FormGroup, Label} from 'reactstrap';

function Checkbox(props) {
  const {
    name,
    label,
    text,
    disabled = false,
    smallLabel = false,
    isRequired = false
  } = props;

  const {register, errors} = useFormContext();

  return (
    <FormGroup>
      {label && (
        <Label for={name} style={smallLabel ? {fontSize: 12} : {}}>
          {label}
          {isRequired ? <span className="text-danger">*</span> : null}
        </Label>
      )}

      <CustomInput
        type="checkbox"
        id={name}
        name={name}
        label={text}
        disabled={disabled}
        innerRef={register}
        invalid={errors?.[name]?.message ? true : false}
      />
    </FormGroup>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  smallLabel: PropTypes.bool,
  isRequired: PropTypes.bool
};

Checkbox.defaultProps = {
  label: null,
  text: 'Checkbox',
  disabled: false,
  smallLabel: false,
  isRequired: false
};

export {Checkbox};
