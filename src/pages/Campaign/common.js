const generateClassName = progress => {
  switch (true) {
    case 66 < progress:
      return 'success';
    case 33 < progress:
      return 'warning';
    case 0 < progress:
      return 'danger';
    case progress === 0:
      return 'secondary';
    default:
      break;
  }
};

const colorStatus = {
  active: {
    class: 'success',
    name: 'active',
    classBorder: 'success'
  },
  pending: {
    class: 'danger',
    name: 'pending',
    classBorder: 'danger'
  },
  completed: {
    class: 'warning text-white',
    name: 'completed',
    classBorder: 'warning'
  },
  inactive: {
    class: 'secondary',
    name: 'inactive',
    classBorder: 'secondary'
  }
};

export {generateClassName, colorStatus};
