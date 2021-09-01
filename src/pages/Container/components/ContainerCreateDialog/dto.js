import {CONTAINER_STATUS} from 'pages/Container/constants';

export const destructureFormData = formData => {
  const {name, publisher, url} = formData;
  return {
    publisher_uuid: publisher?.value,
    url,
    name: name.trim(),
    status: CONTAINER_STATUS.active
  };
};
