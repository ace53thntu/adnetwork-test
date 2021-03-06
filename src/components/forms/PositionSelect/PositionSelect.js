//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {PositionAPIRequest} from 'api/position.api';
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

const PositionSelect = ({
  defaultValue = null,
  name = '',
  label = '',
  placeholder = '',
  disabled = false,
  multiple = false,
  required = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadPosition} = usePositionPagination();

  return (
    <SelectPaginate
      required={required}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadPosition}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting || disabled}
      multiple={multiple}
    />
  );
};

PositionSelect.propTypes = propTypes;

export default PositionSelect;

const usePositionPagination = () => {
  const loadPosition = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await PositionAPIRequest.getAllPosition({
        params: {
          page,
          limit: DEFAULT_PAGINATION.perPage,
          name: search,
          status: 'active'
        },
        options: {isResponseAll: IS_RESPONSE_ALL}
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);

      const total = getResponsePagination(res)?.totalItems || 0;
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
    loadPosition
  };
};
