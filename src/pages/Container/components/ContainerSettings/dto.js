export const containerRepoToFormValues = raw => {
  const {name, url, status} = raw;

  return {
    name,
    url,
    status
  };
};
