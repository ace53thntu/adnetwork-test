//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';

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
  name = '',
  label = '',
  placeholder = 'Select...',
  disabled = false,
  isRequired = false
}) => {
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
        params: {page, limit: DEFAULT_PAGINATION.perPage, name: search},
        options: {isResponseAll: IS_RESPONSE_ALL}
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);
      const total = getResponsePagination(res)?.total;
      const perPage =
        getResponsePagination(res)?.perPage || DEFAULT_PAGINATION.perPage;
      const options = [...data].map(item => ({
        label: item.name,
        value: item.uuid
      }));

      const hasMore = page < Math.ceil(total / perPage);

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
