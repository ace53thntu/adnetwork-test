export const TRACKER_ENTITY = {
  id: '',
  uuid: '',
  name: '',
  status: 'active'
};

export const apiToForm = ({tracker = null}) => {
  if (tracker) {
    const {uuid: id, name, status = 'active'} = tracker;

    return {
      uuid: id,
      id,
      name,
      status
    };
  }

  return TRACKER_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {name, status = 'active'} = formData;

    return {
      name,
      status
    };
  }

  return TRACKER_ENTITY;
};
