// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

// Internal Modules
import {FormReactSelect, FormTextInput} from 'components/forms';
import {FormFieldItem} from './styled';
import {useSearchTypeSelector} from 'store/reducers/inventory-market';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {FilterTypes} from 'constants/inventory-market';

// Prop types
const propTypes = {
  typeOptions: PropTypes.array
};

const FilterBarForm = ({children, typeOptions = [], formatOptions = []}) => {
  const {t} = useTranslation();
  const searchType = useSearchTypeSelector();
  const {
    formState: {isSubmitting}
  } = useFormContext();

  return (
    <>
      {searchType === FilterTypes.SEARCH && (
        <FormFieldItem width="100%">
          <FormTextInput
            placeholder="Please type something..."
            label="Search"
            name="search"
          />
        </FormFieldItem>
      )}
      {searchType === FilterTypes.FILTER && (
        <React.Fragment>
          <FormFieldItem width="180px">
            <FormReactSelect
              name="format"
              label={t('format')}
              placeholder={t('selectFormat')}
              optionLabelField="name"
              options={formatOptions}
              disabled={isSubmitting}
              isClearable
            />
          </FormFieldItem>
          <FormFieldItem width="180px">
            <FormReactSelect
              name="type"
              label={t('type')}
              placeholder={t('selectType')}
              optionLabelField="name"
              options={typeOptions}
              disabled={isSubmitting}
              isClearable
            />
          </FormFieldItem>
          {/* <FormFieldItem>
            <FormTextInput placeholder="Format" label="Format" />
          </FormFieldItem>
          <FormFieldItem>
            <FormTextInput placeholder="Source" label="Source" />
          </FormFieldItem>
          <FormFieldItem>
            <FormTextInput placeholder="Publisher" label="Publisher" />
          </FormFieldItem> */}
          <FormFieldItem>
            <CurrencyInputField
              placeholder="0.00"
              label="Floor price"
              name="floor_price"
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={true}
              decimalsLimit={10}
            />
          </FormFieldItem>
          <FormFieldItem>
            <CurrencyInputField
              placeholder="0.00"
              label="Deal price"
              name="deal_price"
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={true}
              decimalsLimit={10}
            />
          </FormFieldItem>
        </React.Fragment>
      )}
    </>
  );
};

FilterBarForm.propTypes = propTypes;

export default FilterBarForm;
