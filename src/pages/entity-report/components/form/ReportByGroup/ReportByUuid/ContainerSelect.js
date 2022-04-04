//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {ContainerAPIRequest} from 'api/container.api';
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
  sourceId: PropTypes.string
};

const ContainerSelect = ({
  defaultValue = null,
  name = '',
  label = '',
  placeholder = '',
  disabled = false,
  sourceId = ''
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadContainer} = useContainerPagination({sourceId});

  return (
    <SelectPaginate
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadContainer}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={disabled || isSubmitting}
      isClearable
    />
  );
};

ContainerSelect.propTypes = propTypes;

export default ContainerSelect;

const useContainerPagination = ({sourceId}) => {
  const loadContainer = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await ContainerAPIRequest.getAllContainer({
        params: {
          page,
          per_page: DEFAULT_PAGINATION.perPage,
          publisher_uuid: sourceId,
          name: search
        },
        options: {isResponseAll: IS_RESPONSE_ALL}
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);
      const total = getResponsePagination(res)?.total || 0;
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
    [sourceId]
  );

  return {
    loadContainer
  };
};
