import React from 'react';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {useFormContext, Controller} from 'react-hook-form';

const FormTextField = ({
  label,
  name,
  type,
  fullWidth,
  variant,
  disabled,
  defaultValue,
  id,
  InputProps,
  useController,
  ...props
}) => {
  const {errors, register, unregister, control} = useFormContext();

  React.useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  if (useController) {
    /**
     * We need to use Controller as react hooks form
     */
    return (
      <Controller
        as={<TextField {...props} name={name} />}
        control={control}
        name={name}
        type={type}
        label={label}
        variant={variant}
        disabled={disabled}
        error={!!get(errors, name)}
        fullWidth={fullWidth}
        inputRef={register}
        helperText={!!get(errors, name) ? get(errors, `${name}.message`) : null}
        id={id}
        InputProps={InputProps}
      />
    );
  } else {
    const isError = !!errors?.[name] ?? false;
    const message = errors?.[name]?.message ?? null;
    return (
      <TextField
        {...props}
        name={name}
        type={type}
        label={label}
        variant={variant}
        disabled={disabled}
        error={isError}
        fullWidth={fullWidth}
        inputRef={register}
        helperText={message}
        InputProps={InputProps}
      />
    );
  }
};

FormTextField.propTypes = {
  /**
   * Name of input and it will be a field name in Form data.
   */
  name: PropTypes.string.isRequired,
  /**
   * Type of the `input` element
   */
  type: PropTypes.oneOf(['string', 'email', 'password']).isRequired,
  /**
   * The text to be used in an enclosing label element
   */
  label: PropTypes.node,
  /**
   * If `true`, the component will take up the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the radio will be disabled
   */
  disabled: PropTypes.bool,
  /**
   * The variant to use
   */
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled']),
  useController: PropTypes.bool,
};

FormTextField.defaultProps = {
  fullWidth: true,
  disabled: false,
  variant: 'outlined',
  type: 'string',
  useController: true,
};

export default React.memo(FormTextField);
