import {DEFAULT_PAGINATION_RESPONSE} from 'utils/constants/pagination.constants';

export function isValidResponse(res, isResponseAll = false) {
  if (isResponseAll) {
    return Boolean(res?.data?.data?.length);
  } else {
    return Boolean(res?.data?.length);
  }
}

export function getResponseData(res, isResponseAll = false) {
  if (isValidResponse(res, isResponseAll)) {
    return isResponseAll ? res.data.data : res.data;
  } else {
    return [];
  }
}

export function getResponsePagination(res) {
  const headers = res?.headers ?? {};
  if (Object.keys(headers).length) {
    const page = headers?.['x-page'] ?? DEFAULT_PAGINATION_RESPONSE.page;
    const nextPage =
      headers?.['x-next-page'] ?? DEFAULT_PAGINATION_RESPONSE.nextPage;
    const lastPage =
      headers?.['x-last-page'] ?? DEFAULT_PAGINATION_RESPONSE.lastPage;
    const perPage =
      headers?.['x-per-page'] ?? DEFAULT_PAGINATION_RESPONSE.perPage;
    const totalItems =
      headers?.['x-total-items'] ?? DEFAULT_PAGINATION_RESPONSE.totalItems;

    const result = {
      page,
      nextPage,
      lastPage,
      perPage,
      totalItems
    };

    Object.keys(result).forEach(
      key => (result[key] = parseInt(result[key], 10))
    );

    return result;
  }
  return DEFAULT_PAGINATION_RESPONSE;
}
