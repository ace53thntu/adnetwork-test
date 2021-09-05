import {useMemo} from 'react';

export const useDefaultAdvertiser = () => {
  return useMemo(() => {
    return {
      name: '',
      status: 'active',
      iabs: [],
      domains: [],
      tags: []
    };
  }, []);
};
