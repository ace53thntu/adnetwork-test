import {PublisherAPIRequest} from 'api/publisher.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import React from 'react';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';

export function usePublisherPagination() {
  const loadPublisher = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await PublisherAPIRequest.getAllPublisher({
        params: {page, limit: DEFAULT_PAGINATION.perPage, name: search},
        options: {isResponseAll: IS_RESPONSE_ALL}
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);

      const total = getResponsePagination(res)?.totalItems || 0;
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
    []
  );

  return {
    loadPublisher
  };
}
