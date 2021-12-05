export const replaceQueryParam = ({url, paramName, paramValue}) => {
  const href = new URL(url);
  href.searchParams.set(paramName, paramValue);
  return href?.toString() || '';
};
