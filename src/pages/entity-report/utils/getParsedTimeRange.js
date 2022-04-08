export function getParsedTimeRange({timeRange}) {
  if (!timeRange) {
    return '';
  }

  if (typeof timeRange === 'string') {
    try {
      return JSON.parse(timeRange);
    } catch (err) {
      return '';
    }
  }

  return timeRange;
}
