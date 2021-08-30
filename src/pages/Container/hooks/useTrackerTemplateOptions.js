import {useGetTrackerTemplates} from 'queries/tracker-template';
import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useTrackerTemplateOptions = () => {
  const {data: trackerTemplates = []} = useGetTrackerTemplates();
  const trackerOptions = useMemo(() => {
    if (validArray({list: trackerTemplates})) {
      return [...trackerTemplates].map(item => {
        const {uuid, name} = item;

        return {
          value: uuid,
          label: name
        };
      });
    }
    return [];
  }, [trackerTemplates]);

  return trackerOptions;
};
