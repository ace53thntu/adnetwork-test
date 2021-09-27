import {useGetTrackerTemplates} from 'queries/tracker-template';
import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useTrackerTemplateOptions = () => {
  const {data} = useGetTrackerTemplates();
  console.log(
    '🚀 ~ file: useTrackerTemplateOptions.js ~ line 7 ~ useTrackerTemplateOptions ~ trackerTemplates',
    data
  );
  const trackerOptions = useMemo(() => {
    const trackerTemplates = data?.items || [];
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
  }, [data?.items]);

  return trackerOptions;
};
