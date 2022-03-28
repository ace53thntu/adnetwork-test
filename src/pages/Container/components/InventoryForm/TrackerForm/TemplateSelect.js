//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
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
  placeholder: PropTypes.string
};

const TemplateSelect = ({defaultValue = null, name, label, placeholder}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadTrackerTemplate} = useTrackerTemplatePagination();

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadTrackerTemplate}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting}
    />
  );
};

TemplateSelect.propTypes = propTypes;

export default TemplateSelect;

const useTrackerTemplatePagination = () => {
  const loadTrackerTemplate = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await TrackerTemplateAPIRequest.getAllTrackerTemplate({
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
    loadTrackerTemplate
  };
};
