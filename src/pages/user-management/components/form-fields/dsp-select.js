//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {DspAPIRequest} from 'api/dsp.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION} from 'constants/misc';

const propTypes = {
  defaultValue: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

const DspSelect = ({defaultValue = null, name, label, placeholder}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadDsp} = useDspPagination();

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

const useDspPagination = () => {
  const loadDsp = React.useCallback(async (search, prevOptions, {page}) => {
    const res = await DspAPIRequest.getAllDsp({
      params: {
        page,
        limit: DEFAULT_PAGINATION.perPage,
        name: search,
        status: 'active'
      }
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
  }, []);

  return {
    loadDsp
  };
};