// Build-in Modules
import React from 'react';

// External Modules
import {ErrorMessage} from '@hookform/error-message';
import CurrencyInput from 'react-currency-input-field';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {Label} from 'reactstrap';

// Internal Modules
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import {ErrorMessageStyled} from './styled';

const propTypes = {
  className: PropTypes.string,
  inputId: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  groupSeparator: PropTypes.string,
  decimalSeparator: PropTypes.string,
  disabled: PropTypes.bool
};

const CurrencyInputField = props => {
  const {t} = useTranslation();

  const {
    className = '',
    inputId = 'currencyInput',
    name: inputName = '',
    label = '',
    placeholder = t('pleaseEnterNumber'),
    required = false,
    prefix = '',
    groupSeparator = '.',
    decimalSeparator = ',',
    disabled = false
  } = props;
  const {control, errors} = useFormContext();

  return (
    <div className="form-group">
      {label && (
        <Label htmlFor={`${inputId}-${inputName}`}>
          {required && <RequiredLabelPrefix />}
          {label}
        </Label>
      )}
      <Controller
        name={inputName}
        control={control}
        defaultValue=""
        render={({value, onChange, onBlur, name}) => {
          return (
            <CurrencyInput
              id={`${inputId}-${name}`}
              name={name}
              className={`form-control ${className}`}
              value={value}
              onValueChange={onChange}
              placeholder={placeholder}
              prefix={prefix}
              step={1}
              groupSeparator={groupSeparator}
              decimalSeparator={decimalSeparator}
              disabled={disabled}
            />
          );
        }}
      />
      <ErrorMessage
        errors={errors}
        name={inputName}
        render={({message}) => (
          <ErrorMessageStyled>{message}</ErrorMessageStyled>
        )}
      />
    </div>
  );
};

CurrencyInputField.propTypes = propTypes;

export default React.memo(CurrencyInputField);