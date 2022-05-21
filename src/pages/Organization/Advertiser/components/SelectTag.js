import {SelectCreatable} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {INPUT_NAME} from '../constants';

const SelectTag = ({defaultValue = [], disabled = false}) => {
  const {t} = useTranslation();
  const {setValue, errors, watch, register} = useFormContext();
  const selectedTags = watch(INPUT_NAME.TAGS);

  React.useEffect(() => {
    register({name: INPUT_NAME.TAGS});
  }, [register]);

  const onHandleCreateTag = async ({
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
      setValue('tags', [...selected, newOption], {
        shouldDirty: true,
        shouldValidate: true
      });
    } catch (error) {
      console.log('onHandleCreateTag error', error);
    }
  };

  return (
    <SelectCreatable
      data={[]}
      labelKey="tag"
      onCreate={onHandleCreateTag}
      selectedValues={selectedTags}
      setFormValue={setValue}
      name={INPUT_NAME.TAGS}
      placeholder={t('typeAndEnter')}
      label={t('tags')}
      errors={errors}
      disabled={disabled}
    />
  );
};

export default SelectTag;
