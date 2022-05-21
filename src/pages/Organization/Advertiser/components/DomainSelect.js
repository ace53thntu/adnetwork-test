import {SelectCreatable} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {INPUT_NAME} from '../constants';

const DomainSelect = ({defaultValue = [], disabled = false}) => {
  const {t} = useTranslation();
  const {setValue, errors, watch, register} = useFormContext();
  const selectedDomain = watch(INPUT_NAME.DOMAINS);

  React.useEffect(() => {
    register({name: INPUT_NAME.DOMAINS});
  }, [register]);

  const onHandleCreateDomain = async ({
    inputValue,
    createOption,
    setOptions,
    setValue: changeValue,
    options,
    selected
  }) => {
    try {
      const newOption = createOption(inputValue, inputValue);
      setOptions([...options, newOption]);
      changeValue([...selected, newOption]);
      setValue(INPUT_NAME.DOMAINS, [...selected, newOption], {
        shouldDirty: true,
        shouldValidate: true
      });
    } catch (error) {
      console.log('onHandleCreateDomain error', error);
    }
  };

  return (
    <SelectCreatable
      data={[]}
      labelKey="domain"
      onCreate={onHandleCreateDomain}
      selectedValues={selectedDomain}
      setFormValue={setValue}
      name={INPUT_NAME.DOMAINS}
      placeholder={t('typeAndEnter')}
      label={t('domains')}
      errors={errors}
      disabled={disabled}
    />
  );
};

export default DomainSelect;
