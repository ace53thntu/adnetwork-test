//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {PublisherAPIRequest} from 'api/publisher.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION} from 'constants/misc';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

const PublisherSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  disabled = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadPublisher} = usePublisherPagination();

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadPublisher}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={disabled || isSubmitting}
    />
  );
};

PublisherSelect.propTypes = propTypes;

export default PublisherSelect;

const usePublisherPagination = () => {
  const loadPublisher = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await PublisherAPIRequest.getAllPublisher({
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
    loadPublisher
  };
};
