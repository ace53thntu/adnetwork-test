//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {StrategyAPIRequest} from 'api/strategy.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  sourceId: PropTypes.string,
  reportSource: PropTypes.string
};

const StrategySelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  disabled = false,
  required = faAssistiveListeningSystems,
  sourceId = '',
  reportSource = ''
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadStrategy} = useStrategyPagination({sourceId, reportSource});

  return (
    <SelectPaginate
      required={required}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadStrategy}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={disabled || isSubmitting}
      isClearable
    />
  );
};

StrategySelect.propTypes = propTypes;

export default StrategySelect;

const useStrategyPagination = ({sourceId, reportSource}) => {
  const loadStrategy = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await StrategyAPIRequest.getAllStrategy({
        params: {
          page,
          per_page: DEFAULT_PAGINATION.perPage,
          [`${reportSource}_uuid`]: sourceId,
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
    [reportSource, sourceId]
  );

  return {
    loadStrategy
  };
};
