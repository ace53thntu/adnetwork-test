export const formToApi = ({formData}) => {
  const {target, status} = formData;
  return {
    target: parseFloat(target) || 0,
    status
  };
};
