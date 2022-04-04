export function getParsedTimeUnit({timeUnit}) {
  if (!timeUnit) {
    return '';
  }

  if (typeof timeUnit === 'string') {
    try {
      return JSON.parse(timeUnit)?.value;
    } catch (err) {
      return '';
    }
  }

  return timeUnit?.value;
}
