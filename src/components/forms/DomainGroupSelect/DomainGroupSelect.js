//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {DomainGroupAPIRequest} from 'api/domain-group.api';
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
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

const DomainGroupSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  multiple = false,
  required = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadDomainGroup} = useDomainGroupPagination();

  return (
    <SelectPaginate
      required={required}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadDomainGroup}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting}
      multiple={multiple}
    />
  );
};

DomainGroupSelect.propTypes = propTypes;

export default DomainGroupSelect;

const useDomainGroupPagination = () => {
  const loadDomainGroup = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await DomainGroupAPIRequest.getAllDomainGroup({
        params: {
          page,
          limit: DEFAULT_PAGINATION.perPage,
          name: search,
          status: 'active'
        },
        options: {
          isResponseAll: IS_RESPONSE_ALL
        }
      });

      const items = getResponseData(res, IS_RESPONSE_ALL);
      const total = getResponsePagination(res)?.totalItems;
      const perPage =
        getResponsePagination(res)?.perPage || DEFAULT_PAGINATION.perPage;

      const options = [...items].map(item => ({
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
    loadDomainGroup
  };
};
