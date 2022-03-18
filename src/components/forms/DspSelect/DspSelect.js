//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {DspAPIRequest} from 'api/dsp.api';
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
  inventoryId: PropTypes.string
};

const DspSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  inventoryId = ''
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadDsp} = useDspPagination(inventoryId);

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadDsp}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting}
    />
  );
};

DspSelect.propTypes = propTypes;

export default DspSelect;

const useDspPagination = inventoryId => {
  const loadDsp = React.useCallback(
    async (search, prevOptions, {page}) => {
      const params = {
        page,
        limit: DEFAULT_PAGINATION.perPage,
        name: search,
        status: 'active'
      };
      if (inventoryId) {
        params.inventory_uuid = inventoryId;
      }
      const res = await DspAPIRequest.getAllDsp({
        params,
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
        value: item.uuid,
        header_bidding_available: item?.header_bidding_available || false
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
    [inventoryId]
  );

  return {
    loadDsp
  };
};
