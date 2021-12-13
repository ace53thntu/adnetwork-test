export const isFalsy = obj =>
  Object.values(obj).every(value => {
    if (!value) {
      return true;
    }
    return false;
  });
