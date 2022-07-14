//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {DomainAPIRequest} from 'api/domain.api';
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
  multiple: PropTypes.bool
};

const DomainSelect = ({
  defaultValue = null,
  name = '',
  label = '',
  placeholder = '',
  disabled = false,
  multiple = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadDomain} = useDomainPagination();

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadDomain}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting || disabled}
      multiple={multiple}
    />
  );
};

DomainSelect.propTypes = propTypes;

export default DomainSelect;

const useDomainPagination = () => {
  const loadDomain = React.useCallback(async (search, prevOptions, {page}) => {
    const res = await DomainAPIRequest.getAllDomain({
      params: {page, limit: DEFAULT_PAGINATION.perPage, domain: search},
      options: {isResponseAll: IS_RESPONSE_ALL}
    });

    const data = getResponseData(res, IS_RESPONSE_ALL);

    const total = getResponsePagination(res)?.totalItems || 0;
    const perPage =
      getResponsePagination(res)?.perPage || DEFAULT_PAGINATION.perPage;

    const options = [...data].map(item => ({
      label: item.domain,
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
  }, []);

  return {
    loadDomain
  };
};
