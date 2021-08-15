import {useQuery} from 'react-query';
import {ContainerService, FileService} from 'core';
import {IMPORTED_FILES} from './constants';

const fetchImport = async id => {
  try {
    const response = await ContainerService.getImport(id).then(
      res => res?.data ?? {}
    );
    let resObj = {
      ...response
    };
    if (response?.file?.length) {
      const res = await FileService.getFile(response.file);
      resObj.file = res?.data;
    }
    return resObj;
  } catch (error) {
    throw new Error(error);
  }
};

export function useGetImport(id) {
  return useQuery([IMPORTED_FILES, id], () => fetchImport(id), {
    suspense: false,
    enabled: !!id
  });
}
