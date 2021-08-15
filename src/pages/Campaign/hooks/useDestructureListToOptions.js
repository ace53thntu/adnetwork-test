export const useDestructureListToOptions = ({
  listData = [],
  keyName = 'name',
  keyId = 'id'
}) => {
  if (!listData || !Array.isArray(listData) || listData.length === 0) {
    return [];
  }

  const result = listData.map(listItem => {
    const name = listItem[keyName] ?? '';
    const id = listItem[keyId] ?? undefined;

    return {
      name,
      id,
      value: id,
      label: name
    };
  });

  return result;
};
