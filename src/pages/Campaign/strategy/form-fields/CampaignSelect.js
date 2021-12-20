//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {CampaignAPIRequest} from 'api/campaign.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION} from 'constants/misc';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

const CampaignSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  disabled = false
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadCampaign} = useCampaignPagination();

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadCampaign}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={disabled || isSubmitting}
    />
  );
};

CampaignSelect.propTypes = propTypes;

export default CampaignSelect;

const useCampaignPagination = () => {
  const loadCampaign = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await CampaignAPIRequest.getAllCampaign({
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
    loadCampaign
  };
};
