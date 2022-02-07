//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {VideoAPI} from 'api/video.api';
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

const VideoSelect = ({defaultValue = null, name, label, placeholder}) => {
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadVideo} = useVideoPagination();

  return (
    <SelectPaginate
      required
      name={name}
      label={label}
      placeholder={placeholder}
      loadOptions={loadVideo}
      additional={{
        page: 1
      }}
      defaultValue={defaultValue || null}
      disabled={isSubmitting}
    />
  );
};

VideoSelect.propTypes = propTypes;

export default VideoSelect;

const useVideoPagination = () => {
  const loadVideo = React.useCallback(async (search, prevOptions, {page}) => {
    const res = await VideoAPI.getVideos({
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
    const total = getResponsePagination(res)?.total;
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
  }, []);

  return {
    loadVideo
  };
};
