import {Statuses} from 'constants/misc';

export const POSITION_ENTITY = {
  id: '',
  uuid: '',
  name: '',
  status: Statuses.ACTIVE
};

export const apiToForm = ({position = null}) => {
  if (position) {
    const {uuid: id, name, status = 'active'} = position;

    return {
      uuid: id,
      id,
      name,
      status
    };
  }

  return POSITION_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {name, status = Statuses.ACTIVE} = formData;

    return {
      name,
      status
    };
  }

  return POSITION_ENTITY;
};
