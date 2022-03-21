export const cumulativeSum = (list = []) => {
  if (!Array.isArray(list)) {
    throw new TypeError(`Expected an array of numbers, got ${typeof list}`);
  }

  let sum = 0;

  return list.map(value => (sum += value)); // eslint-disable-line no-return-assign
};
