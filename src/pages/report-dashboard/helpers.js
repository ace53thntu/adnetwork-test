export const checkIsFollowed = ({page = {}, currentUser = {}}) => {
  let isFollow = false;
  const {favorites} = page;
  const foundUser = favorites?.find(
    userItem => userItem?.id === currentUser?.id
  );

  if (foundUser) {
    isFollow = true;
  }

  return isFollow;
};
