export const getInventoryTypeColor = ({type = 'default'}) => {
  switch (type) {
    case 'direct': {
      return 'primary';
    }
    case 'bid': {
      return 'warning';
    }
    default:
      return 'secondary';
  }
};
