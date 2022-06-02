export const conceptItemRepoToView = raw => {
  const {name, uuid } = raw;

  return {
    id: uuid,
    name,
  };
};
