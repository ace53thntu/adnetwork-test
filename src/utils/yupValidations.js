const VALID_NUMBER = /^[\\+\\-]?\d*\.?\d+(?:[Ee][\\+\\-]?\d+)?$/;

export const validateFloatInput = value => {
  if (!value) return true;
  return (value + '').match(VALID_NUMBER);
};

export const validateNumberInput = val => {
  if (!val) {
    return true;
  }

  const reg = /^\d+$/;
  // const parsed = parseInt(val, 10);
  const isNumber = reg.test(val);
  if (isNumber) {
    return true;
  }
  return false;
};
