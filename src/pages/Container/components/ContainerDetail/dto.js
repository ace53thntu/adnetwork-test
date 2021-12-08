export const mappingApiToForm = ({
  container,
  containerRedux,
  t,
  publisher = {}
}) => {
  if (container) {
    const {name = '', url = '', status = 'active'} = container;
    return {
      name,
      url,
      status,
      publisher_uuid: {value: publisher?.uuid, label: publisher?.name}
    };
  }
  if (containerRedux) {
    const {name = '', url = '', status = 'active'} = containerRedux;

    return {
      name,
      url,
      status,
      publisher_uuid: {value: publisher?.uuid, label: publisher?.name}
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
