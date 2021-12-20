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

export const getInventoryMarketTypeColor = ({type = 'public'}) => {
  switch (type) {
    case 'public': {
      return 'primary';
    }
    case 'private': {
      return 'warning';
    }
    default:
      return 'primary';
  }
};
