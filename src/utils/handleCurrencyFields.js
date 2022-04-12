export const convertApiToGui = ({value}) => {
  if (!value) {
    return '';
  }

  return parseFloat(value) / 1000;
};

export const convertGuiToApi = ({value}) => {
  if (value) {
    return parseInt(parseFloat(value) * 1000, 10) || null;
  }

  return null;
};
