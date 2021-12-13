// Build-in Modules
import React from 'react';

// External Modules
import CurrencyInput from 'react-currency-input-field';
import {Controller, useFormContext} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useTranslation} from 'react-i18next';
import {Label} from 'reactstrap';

// Internal Modules
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import {ErrorMessageStyled} from './styled';

const CurrencyInputField = props => {
  const {t} = useTranslation();

  const {
    className,
    inputId = 'currencyInput',
    name: inputName = '',
    label = '',
    placeholder = t('pleaseEnterNumber'),
    required = false,
    prefix = '',
    groupSeparator = '.',
    decimalSeparator = ','
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

export default React.memo(CurrencyInputField);
