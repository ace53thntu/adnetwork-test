export const createConceptModelToRepo = (raw, advertiserId) => {
  const {name} = raw;

  return {
    name,
    status: 'active',
    advertiser_uuid: advertiserId
  };
};
