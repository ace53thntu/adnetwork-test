const limit = 1000;

export const validateCurrencyInput = value => {
  if (!value) {
    return true;
  }

  if (Number.isNaN(Number(value))) {
    // setErrorMessage('Please enter a valid number');
    // setClassName('is-invalid');
    return false;
  }

  if (Number(value) > limit) {
    // setErrorMessage(`Max: ${prefix}${limit}`);
    // setClassName('is-invalid');
    // setValue(value);
    return false;
  }
};
