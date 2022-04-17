//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {LocationAPIRequest} from 'api/location.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';

const propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

const LocationSelect = ({
  defaultValue = [],
  name,
  label,
  placeholder,
  disabled = false,
  multiple = false,
  required = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadLocation} = useLocationPagination();

  return (
    <SelectPaginate
      required={required}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadLocation}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || []}
      disabled={disabled || isSubmitting}
      multiple={multiple}
    />
  );
};

LocationSelect.propTypes = propTypes;

export default LocationSelect;

const useLocationPagination = () => {
  const loadLocation = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await LocationAPIRequest.getAllGeo({
        params: {
          page,
          per_page: DEFAULT_PAGINATION.perPage,
          full_location_name: search,
          sort: 'level ASC'
        },
        options: {isResponseAll: IS_RESPONSE_ALL}
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);
      const total = getResponsePagination(res)?.totalItems || 0;
      const perPage =
        getResponsePagination(res)?.perPage || DEFAULT_PAGINATION.perPage;

      const options = [...data].map(item => ({
        label: item.full_location_name,
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
    loadLocation
  };
};
