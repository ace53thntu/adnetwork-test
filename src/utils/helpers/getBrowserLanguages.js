import ISO6391 from 'iso-639-1';

export const getBrowserLanguages = () => {
  const allNames = ISO6391.getAllNames();
  const allCodes = ISO6391.getAllCodes();

  return allCodes?.map((item, idx) => ({value: item, label: allNames?.[idx]}));
};
