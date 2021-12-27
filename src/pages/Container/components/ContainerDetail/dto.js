export const mappingApiToForm = ({container, containerRedux, t}) => {
  if (container) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name
    } = container;
    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null
    };
  }
  if (containerRedux) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name
    } = containerRedux;

    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null
    };
  }

  return {
    name: '',
    url: '',
    status: {
      id: 'active',
      label: t('active'),
      value: 'active'
    },
    publisher_uuid: null
  };
};

export const mappingFormToApi = formData => {
  const {name, url, publisher_uuid, status} = formData;
  return {
    name,
    url,
    publisher_uuid: publisher_uuid?.value,
    status
  };
};
