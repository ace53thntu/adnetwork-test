//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {DomainAPIRequest} from 'api/domain.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION} from 'constants/misc';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

const DomainSelect = ({defaultValue = null, name, label, placeholder}) => {
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
      disabled={isSubmitting}
    />
  );
};

DomainSelect.propTypes = propTypes;

export default DomainSelect;

const useDomainPagination = () => {
  const loadDomain = React.useCallback(async (search, prevOptions, {page}) => {
    const res = await DomainAPIRequest.getAllDomain({
      params: {page, limit: DEFAULT_PAGINATION.perPage, name: search}
    });

    const {items, total} = res?.data ?? [];

    const options = [...items].map(item => ({
      label: item.domain,
      value: item.domain
    }));

    const hasMore = page < Math.ceil(total / DEFAULT_PAGINATION.perPage);

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
