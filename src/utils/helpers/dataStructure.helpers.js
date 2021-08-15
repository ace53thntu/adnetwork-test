/**
 * @function Convert Array to Object
 * @param {*} array
 * @param {*} key
 */
export const convertArrayToObject = (array = [], key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

export const validArray = ({list = []}) => {
  if (!list || !Array.isArray(list) || list.length === 0) {
    return false;
  }

  return true;
};
