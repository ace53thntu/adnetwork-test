import {useGetPublishers} from 'queries/publisher';
import {useMemo} from 'react';

export const usePublisherOptions = () => {
  const {data: publishersRes} = useGetPublishers();
  return useMemo(() => {
    if (publishersRes) {
      const publisherOptions = publishersRes?.items?.map(item => {
        const {uuid, name, status} = item;
        return {
          value: uuid,
          label: name,
          status
        };
      });
      return publisherOptions ?? [];
    }
    return [];
  }, [publishersRes]);
};
