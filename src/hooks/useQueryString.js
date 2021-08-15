import {useLocation} from 'react-router';

export const useQueryString = () => {
  return new URLSearchParams(useLocation().search);
};
