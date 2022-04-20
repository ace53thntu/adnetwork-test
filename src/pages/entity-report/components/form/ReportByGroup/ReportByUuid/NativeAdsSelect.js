//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {NativeAdAPI} from 'api/native-ad.api';
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
  sourceId: PropTypes.string,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  reportSource: PropTypes.string
};

const NativeAdSelect = ({
  defaultValue = null,
  name,
  label,
  placeholder,
  multiple = false,
  required = false,
  sourceId = '',
  reportSource = ''
}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadNativeAd} = useNativeAdPagination({sourceId, reportSource});

  return (
    <SelectPaginate
      required={required}
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadNativeAd}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting}
      multiple={multiple}
      isClearable
    />
  );
};

NativeAdSelect.propTypes = propTypes;

export default NativeAdSelect;

const useNativeAdPagination = ({sourceId, reportSource}) => {
  const loadNativeAd = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await NativeAdAPI.getNativeAds({
        params: {
          page,
          per_page: DEFAULT_PAGINATION.perPage,
          [`${reportSource}_uuid`]: sourceId,
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
    [reportSource, sourceId]
  );

  return {
    loadNativeAd
  };
};
