//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION} from 'constants/misc';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool
};

const AdvertiserSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  disabled = false,
  isRequired = false
}) => {
  console.log(
    '🚀 ~ file: AdvertiserSelect.js ~ line 30 ~ defaultValue',
    defaultValue
  );
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadAdvertiser} = useAdvertiserPagination();

  return (
    <SelectPaginate
      required={isRequired}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadAdvertiser}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={disabled || isSubmitting}
    />
  );
};

AdvertiserSelect.propTypes = propTypes;

export default AdvertiserSelect;

const useAdvertiserPagination = () => {
  const loadAdvertiser = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await AdvertiserAPIRequest.getAllAdvertiser({
        params: {page, limit: DEFAULT_PAGINATION.perPage, name: search}
      });

      const {items, total} = res?.data ?? [];

      const options = [...items].map(item => ({
        label: item.name,
        value: item.uuid
      }));

      const hasMore = page < Math.ceil(total / DEFAULT_PAGINATION.perPage);

      return {
        options,
        hasMore,
        additional: {
          page: page + 1
        }
      };
    },
    []
  );

  return {
    loadAdvertiser
  };
};
