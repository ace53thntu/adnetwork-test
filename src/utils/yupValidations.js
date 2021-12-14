const VALID_NUMBER = /^[\\+\\-]?\d*\.?\d+(?:[Ee][\\+\\-]?\d+)?$/;

export const validateFloatInput = value => {
  if (!value) return true;
  return (value + '').match(VALID_NUMBER);
};
