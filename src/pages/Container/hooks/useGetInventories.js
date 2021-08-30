const {useMemo} = require('react');
const {validArray} = require('utils/helpers/dataStructure.helpers');

const useGetInventories = ({pages = [], pageId}) => {
  return useMemo(() => {
    if (validArray({list: pages}) && pageId) {
      const foundPage = pages.find(item => item?.uuid === pageId);
      return foundPage?.inventories || [];
    }
    return [];
  }, [pageId, pages]);
};

export default useGetInventories;
