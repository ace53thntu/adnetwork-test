import {PublisherAPIRequest} from 'api/publisher.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import React from 'react';

export function usePublisherPagination() {
  const loadPublisher = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await PublisherAPIRequest.getAllPublisher({
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
    loadPublisher
  };
}
