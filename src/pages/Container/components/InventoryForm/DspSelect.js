//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
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
  currentInventory: PropTypes.object
};

const DspSelect = ({currentInventory = {}}) => {
  const {t} = useTranslation();
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadDsp} = useDspPagination();

  return (
    <SelectPaginate
      required
      name="market_dsps"
      label={t('dsp')}
      placeholder={t('selectDsp')}
      loadOptions={loadDsp}
      additional={{
        page: 1
      }}
      defaultValue={currentInventory?.market_dsps || null}
      multiple
      disabled={isSubmitting}
    />
  );
};

DspSelect.propTypes = propTypes;

export default DspSelect;

const useDspPagination = () => {
  const loadDsp = React.useCallback(async (search, prevOptions, {page}) => {
    const res = await DspAPIRequest.getAllDsp({
      params: {page, limit: DEFAULT_PAGINATION.perPage, name: search},
      options: {isResponseAll: IS_RESPONSE_ALL}
    });

    const data = getResponseData(res, IS_RESPONSE_ALL);
    const total = getResponsePagination(res)?.totalItems;
    const perPage = getResponsePagination(res)?.perPage;

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
  }, []);

  return {
    loadDsp
  };
};
