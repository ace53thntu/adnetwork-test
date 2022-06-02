export const conceptItemRepoToView = raw => {
  const {name, uuid, fileType, fileUUID } = raw;

  return {
    id: uuid,
    name,
    fileUUID,
    fileType
  };
};
