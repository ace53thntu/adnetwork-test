const {useMemo} = require('react');
const {validArray} = require('utils/helpers/dataStructure.helpers');

const useGetInventories = ({pages = [], pageId}) => {
  console.log(
    '🚀 ~ file: useGetInventories.js ~ line 5 ~ useGetInventories ~ pages',
    pages
  );
  return useMemo(() => {
    if (validArray({list: pages}) && pageId) {
      const foundPage = pages.find(item => item?.uuid === pageId);
      console.log(
        '🚀 ~ file: useGetInventories.js ~ line 8 ~ returnuseMemo ~ foundPage',
        foundPage
      );
      return foundPage?.inventories || [];
    }
    return [];
  }, [pageId, pages]);
};

export default useGetInventories;
