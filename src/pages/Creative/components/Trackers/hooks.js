import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import * as React from 'react';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';

export const useGetTrackerTemplatesPagination = () => {
  const loadTrackerTemplates = React.useCallback(
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
        value: item.uuid,
        variables: item.variables
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
    loadTrackerTemplates
  };
};
