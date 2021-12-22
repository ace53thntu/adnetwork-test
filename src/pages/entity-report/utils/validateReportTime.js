export const validTimeRange = ({timeRange, unit}) => {
  if (timeRange?.units?.find(item => item?.value === unit)) {
    return true;
  }

  if (timeRange?.units?.length === 1) {
    return true;
  }

  return false;
};
