// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

// Internal Modules
import {SelectCreatable} from 'components/forms';
import {InputNames} from '../constant';

const propTypes = {
  defaultValue: PropTypes.array
};

const KeywordSelectCreatable = ({defaultValue = []}) => {
  const {t} = useTranslation();
  const {setValue, errors, watch, register} = useFormContext();
  const selectKeywords = watch(InputNames.KEYWORDS);

  React.useEffect(() => {
    register({name: InputNames.KEYWORDS});
  }, [register]);

  const onHandleCreateKeyword = async ({
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
      setValue(InputNames.KEYWORDS, [...selected, newOption], {
        shouldDirty: true,
        shouldValidate: true
      });
    } catch (error) {
      console.log('onHandleCreateKeyword error', error);
    }
  };

  return (
    <SelectCreatable
      data={[]}
      labelKey="keyword"
      onCreate={onHandleCreateKeyword}
      selectedValues={selectKeywords}
      setFormValue={setValue}
      name={InputNames.KEYWORDS}
      placeholder={t('typeAndEnter')}
      label={t('keywords')}
      errors={errors}
    />
  );
};

KeywordSelectCreatable.propTypes = propTypes;

export default KeywordSelectCreatable;
