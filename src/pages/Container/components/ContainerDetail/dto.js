export const mappingApiToForm = ({container, containerRedux, t}) => {
  if (container) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name,
      first_party,
      cost
    } = container;
    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null,
      first_party: first_party ? 'active' : 'inactive',
      cost
    };
  }
  if (containerRedux) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name,
      first_party = true,
      cost
    } = containerRedux;

    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null,
      first_party: first_party ? 'active' : 'inactive',
      cost
    };
  }

  return {
    name: '',
    url: '',
    status: 'active',
    publisher_uuid: null,
    first_party: 'active',
    cost: ''
  };
};

export const mappingFormToApi = formData => {
  const {name, url, publisher_uuid, status, first_party, cost} = formData;
  return {
    name,
    url,
    publisher_uuid: publisher_uuid?.value,
    status,
    first_party: first_party === 'active' ? true : false,
    cost: parseFloat(cost) || 0
  };
};
