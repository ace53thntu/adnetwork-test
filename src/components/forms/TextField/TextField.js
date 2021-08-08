import __get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormFeedback, FormGroup, Label, Input as StrapInput} from 'reactstrap';

function TextField(props) {
  const {
    type,
    name,
    placeholder,
    label,
    isRequired,
    defaultValue,
    disabled,
    style,
    smallLabel,
    ...rest
  } = props;

  const {register, errors} = useFormContext();
  const errorMessage = __get(errors, `${name}.message`);

  return (
    <FormGroup>
      {label ? (
        <Label
          for={name}
          style={
            smallLabel
              ? {
                  fontSize: 12
                }
              : {}
          }
        >
          {label}
          {isRequired ? <span className="text-danger">*</span> : null}
        </Label>
      ) : null}
      <StrapInput
        {...rest}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        name={name}
        innerRef={register}
        invalid={!!errorMessage}
        disabled={disabled}
        style={style}
        id={name}
      />
      {!!errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </FormGroup>
  );
}

TextField.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'textarea', 'password']),
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  smallLabel: PropTypes.bool
};

TextField.defaultProps = {
  type: 'text',
  placeholder: '',
  id: '',
  label: null,
  isRequired: false,
  defaultValue: '',
  disabled: false,
  style: null,
  smallLabel: false
};
export {TextField};
