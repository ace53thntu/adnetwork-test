import {IS_RESPONSE_ALL} from "../../constants/misc";
import {ContainerAPIRequest} from "../../api/container.api";
import {CONTAINER_TREE_SOURCES} from "./components/Tree/constants";

const DEFAULT_PAGE = 1;
const TOTAL_ITEMS = 1000;

export const unSelectedChild = item => {
  if (item?.children?.length) {
    return {
      ...item,
      selected: false,
      children: [...item.children].map(child => unSelectedChild(child))
    };
  }
  return {
    ...item,
    selected: false
  };
};

export const getAllContainerTreeData = async () => {
  let containerDataMap;
  const params = {
    page: DEFAULT_PAGE,
    per_page: TOTAL_ITEMS,
    sort: 'created_at DESC',
    status: 'active'
  };
  const response = await ContainerAPIRequest.getAllContainer({
    params,
    options: {
      isResponseAll: IS_RESPONSE_ALL
    }
  });

  const { data: containerData } = response?.data || {};
  if(containerData){
    containerDataMap = containerData.map(container => {
      const { name: containerName, uuid: containerUUID, sources, pages } = container || {};
      const childrenSourceMap = sources.map(source => {
        const  keyValue = `${containerUUID}-${source}`;
        return {
          key: keyValue,
          title: CONTAINER_TREE_SOURCES[source],
          value: keyValue,
          isSource: true,
          selectable: false,
          children:
            pages.filter(page => page.source === source)
            .map(page => ({ ...page, key: page.uuid, title: page.name, value: page.uuid, isPage: true }))
        }
      });
      return { ...container, title: containerName, value: containerUUID, isContainer: true, children: childrenSourceMap };
    })

  }
  return containerDataMap;
}
