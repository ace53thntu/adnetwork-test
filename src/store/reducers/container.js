import {original} from 'immer';
import {matchSorter} from 'match-sorter';
import {CONTAINER_TREE_SOURCES} from 'pages/Container/components/Tree/constants';
import {
  unSelectedAndUnExpanded,
  unSelectedChild
} from 'pages/Container/components/Tree/utils';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

// dispatch action types
const RESET = '@container/RESET';
const SHOULD_REFETCH_CONTAINER = '@container/SHOULD_REFETCH_CONTAINER';
const CONTAINERS = '@container/CONTAINERS';
const SELECT_CONTAINER_ID = '@container/SELECT_CONTAINER_ID';
const EXPAND_CONTAINER = '@container/EXPAND_CONTAINER';
const SET_CONTAINER = '@container/SET_CONTAINER';
const UN_EXPAND_CONTAINERS = '@container/UN_EXPAND_CONTAINERS';
const UPDATED_CONTAINER = '@container/UPDATED_CONTAINER';
const SEARCH_CONTAINERS = '@container/SEARCH_CONTAINERS';
const TOGGLE_CREATE_CONTAINER_MODAL =
  '@container/TOGGLE_CREATE_CONTAINER_MODAL';

const EXPAND_SOURCE = '@container/EXPAND_SOURCE';
const SET_FLAG_ALREADY = '@container/SET_FLAG_ALREADY';
const TOGGLE_CREATE_EVENT = '@container/TOGGLE_CREATE_EVENT';
const EVENT_PAGING = '@container/EVENT_PAGING';

const TOGGLE_CREATE_PAGE_MODAL = '@container/TOGGLE_CREATE_PAGE_MODAL';
const DELETE_PAGE = '@container/DELETE_PAGE';
const UPDATE_PAGE = '@container/UPDATE_PAGE';
const CREATED_PAGE = '@container/CREATED_PAGE';

const CREATED_IMPORT_OR_TRANSFER = '@container/CREATED_IMPORT_OR_TRANSFER';
const SELECT_PAGE_ID = '@container/SELECT_PAGE_ID';
const SET_INVENTORY_PARAMS = '@container/SET_INVENTORY_PARAMS';

// dispatch actions
export const setInventoryParamsRedux = params => {
  return createAction(SET_INVENTORY_PARAMS, {params});
};
export const resetContainerRedux = () => {
  return createAction(RESET, {});
};
export const shouldRefetchContainerRedux = flag => {
  return createAction(SHOULD_REFETCH_CONTAINER, {flag});
};
export const setContainersRedux = data => {
  return createAction(CONTAINERS, {data});
};
export const selectContainerRedux = (containerId, container) => {
  return createAction(SELECT_CONTAINER_ID, {containerId, container});
};
export const expandContainerRedux = (containerId, state) => {
  return createAction(EXPAND_CONTAINER, {containerId, state});
};
export const expandSourceRedux = (sourceId, state, containerId) => {
  return createAction(EXPAND_SOURCE, {sourceId, state, containerId});
};
export const setContainerRedux = (container, source, pageId, pages) => {
  return createAction(SET_CONTAINER, {container, source, pageId, pages});
};
export const unExpandContainersRedux = () => {
  return createAction(UN_EXPAND_CONTAINERS, {});
};
export const selectPageRedux = (pageId, page) => {
  return createAction(SELECT_PAGE_ID, {pageId, page});
};
export const deletePageRedux = () => {
  return createAction(DELETE_PAGE, {});
};
export const setFlagAlready = flag => {
  return createAction(SET_FLAG_ALREADY, {flag});
};
export const updatePageRedux = ({pageId, name}) => {
  return createAction(UPDATE_PAGE, {name, pageId});
};
export const toggleCreateEventRedux = eventId => {
  return createAction(TOGGLE_CREATE_EVENT, {eventId});
};
export const eventPagingRedux = paging => {
  return createAction(EVENT_PAGING, {paging});
};
export const toggleCreatePageModalRedux = source => {
  return createAction(TOGGLE_CREATE_PAGE_MODAL, {source});
};
export const createdPageRedux = () => {
  return createAction(CREATED_PAGE, {});
};
export const updatedContainerRedux = container => {
  return createAction(UPDATED_CONTAINER, {container});
};
export const searchContainersRedux = keyword => {
  return createAction(SEARCH_CONTAINERS, {keyword});
};
export const toggleCreateContainerModalRedux = () => {
  return createAction(TOGGLE_CREATE_CONTAINER_MODAL, {});
};
export const createdImportRedux = (source, container) => {
  return createAction(CREATED_IMPORT_OR_TRANSFER, {container, source});
};

const containerInitialState = {
  containers: [],
  containersTemp: [],
  isLoading: true,
  selectedContainerId: null,
  expandedIds: [],
  selectedSource: null,
  container: null,
  selectedPageId: null,
  alreadySetContainer: false,
  toggleCreateEvent: false,
  toggleCreatePageModal: false,
  toggleCreateContainerModal: false,
  eventId: null,
  eventPaging: {
    page: 1,
    perPage: 5
  },
  keyword: '',
  shouldRefetchContainer: false,
  inventoryParams: null
};

const handleActions = {
  // [SELECT_PAGE_ID]: handleSelectPage,
  [SET_INVENTORY_PARAMS]: handleSetInventoryParams,
  [RESET]: handleReset,
  [SHOULD_REFETCH_CONTAINER]: handleShouldRefetchContainer,
  [CONTAINERS]: handleSetContainers,
  [SET_CONTAINER]: handleSetContainer,
  [SELECT_CONTAINER_ID]: handleSelectContainer,
  [EXPAND_CONTAINER]: handleExpandContainer,
  [UN_EXPAND_CONTAINERS]: handleUnExpandContainers,
  [UPDATED_CONTAINER]: handleUpdatedContainer,
  [SEARCH_CONTAINERS]: handleSearchContainers,
  [TOGGLE_CREATE_CONTAINER_MODAL]: handleToggleCreateContainerModal,

  [EXPAND_SOURCE]: handleExpandSource,
  [SET_FLAG_ALREADY]: handleSetFlagAlready,
  [DELETE_PAGE]: handleDeletePage,
  [UPDATE_PAGE]: handleUpdatePage,
  [TOGGLE_CREATE_PAGE_MODAL]: handleCreatePageModal,

  [TOGGLE_CREATE_EVENT]: handleToggleCreateEvent,
  [EVENT_PAGING]: handleEventPaging,
  [CREATED_IMPORT_OR_TRANSFER]: handleCreatedImport
};

function handleSetInventoryParams(state, action) {
  state.inventoryParams = action.payload.params;
}

function handleReset(state) {
  state.containers = [];
  state.containersTemp = [];
  state.isLoading = true;
  state.selectedContainerId = null;
  state.expandedIds = [];
  state.selectedSource = null;
  state.container = null;
  state.selectedPageId = null;
  state.alreadySetContainer = false;
  state.toggleCreateEvent = false;
  state.toggleCreatePageModal = false;
  state.toggleCreateContainerModal = false;
  state.eventId = null;
  state.eventPaging = {
    page: 1,
    perPage: 5
  };
  state.keyword = '';
  state.shouldRefetchContainer = false;
}

function handleShouldRefetchContainer(state, action) {
  state.shouldRefetchContainer = action.payload.flag;
}

function handleSetContainers(state, action) {
  const {data} = action.payload;

  state.containers = data;
  state.containersTemp = data;
  state.isLoading = false;
}

// function handleSelectPage(state, action) {
//     const {pageId, page} = action.payload;

//     const newNodes = [...state.pages].map(item => {
//       if (item.id === pageId) {
//         return {
//           ...item,
//           selected: true,
//           children: [...item.children].map(child => unSelectedChild(child))
//         };
//       }
//       return unSelectedAndUnExpanded(item);
//     });
//     state.selectedContainerId = containerId;
//     state.pages = newNodes;
//     state.keyword = '';
//     state.page = page;
//     state.selectedSource = null;
//     state.selectedPageId = pageId;
//   }
// }

function handleSelectContainer(state, action) {
  const {containerId, container} = action.payload;

  const newNodes = [...state.containers].map(item => {
    if (item.id === containerId) {
      return {
        ...item,
        selected: true,
        children: [...item.children].map(child => unSelectedChild(child))
      };
    }
    return unSelectedAndUnExpanded(item);
  });
  state.selectedContainerId = containerId;
  state.containers = newNodes;
  state.keyword = '';
  state.container = container;
  state.selectedSource = null;
  state.selectedPageId = null;
}

function handleExpandContainer(state, action) {
  const {containerId, state: nodeState} = action.payload;
  if (state.expandedIds.includes(containerId)) {
    state.expandedIds = state.expandedIds.filter(
      advId => advId !== containerId
    );
  } else {
    state.expandedIds = [...state.expandedIds, containerId];
  }

  const newNodes = [...state.containers].map(item => {
    if (item.id === containerId) {
      return {
        ...item,
        expanded: !item.expanded,
        ...nodeState
        // selected: !item.selected
      };
    }
    if (item.id !== state.selectedContainerId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.containers = newNodes;
}

function handleSetContainer(state, action) {
  const {container, source, pageId, pages = []} = action.payload;

  const newNodes = [...state.containers].map(item => {
    if (item.id === container.uuid) {
      //
      if (!item.expanded) {
        let containerItem = {
          ...item,
          expanded: true,
          selected: false
        };

        const {import_count, transfer_count, sources} = container;
        const containerSource = sources?.reduce((acc, item) => {
          acc = {...acc, [item]: 1};
          return acc;
        }, {});

        if (source === 'import' && import_count === 0) {
          containerItem.selected = true;
        }
        if (source === 'transfer' && transfer_count === 0) {
          containerItem.selected = true;
        }

        let children = [];

        if (!!containerSource && Object.keys(containerSource).length) {
          Object.keys(containerSource).forEach((sourceKey, index) => {
            children.push({
              id: sourceKey,
              name: CONTAINER_TREE_SOURCES[sourceKey],
              children: [],
              numChildren: containerSource[sourceKey] ?? 0,
              page: 0,
              expanded: false,
              selected: false,
              parentId: container.uuid,
              isSource: true
            });
          });
        }

        if (import_count > 0) {
          children.push({
            id: 'import',
            name: CONTAINER_TREE_SOURCES.import,
            children: [],
            numChildren: 0,
            page: 0,
            expanded: false,
            selected: source === 'import',
            parentId: container.id,
            isSource: true
          });
        }

        if (transfer_count > 0) {
          children.push({
            id: 'transfer',
            name: CONTAINER_TREE_SOURCES.transfer,
            children: [],
            numChildren: 0,
            page: 0,
            expanded: false,
            selected: source === 'transfer',
            parentId: container.id,
            isSource: true
          });
        }

        containerItem.children = children.map(child => {
          if (child.id === source) {
            let sourceItem = {
              ...child,
              expanded: true,
              selected: false
            };

            if (child.id !== 'import' && child.id !== 'transfer') {
              const pagesBySource = pages?.length > 0 ? pages : child?.children;

              const sourceChildren = pagesBySource?.map((sourceData, index) => {
                const {id, name} = sourceData;

                return {
                  id,
                  name: name,
                  children: [],
                  numChildren: 0,
                  page: 0,
                  expanded: false,
                  selected: pageId === id,
                  parentId: child.id,
                  isPage: true,
                  containerId: container.id
                };
              });

              sourceItem.children = sourceChildren;
            } else {
              sourceItem.selected = true;
            }

            return sourceItem;
          }
          return {
            ...child,
            selected: false,
            expanded: false
          };
        });

        if (item.numChildren <= 0) {
          containerItem.numChildren = containerItem.children.length;
        }
        return containerItem;
      } else {
        const isExistSource = !!item.children.find(
          sourceNe => sourceNe.id === source
        );

        if (isExistSource) {
          return {
            ...item,
            expanded: true,
            selected: false,
            children: [...item.children].map(child => {
              if (child.id === source) {
                let sourceItem = {
                  ...child,
                  expanded: true,
                  selected: false
                };
                const pagesBySource =
                  pages?.length > 0 ? pages : child?.children;

                const sourceChildren = pagesBySource?.map(
                  (sourceData, index) => {
                    const {id, name} = sourceData;
                    return {
                      id,
                      name: name,
                      children: [],
                      numChildren: 0,
                      page: 0,
                      expanded: false,
                      selected: pageId === id,
                      // selected: state.selectedPageId === id index === 0,
                      parentId: child.id,
                      isPage: true,
                      containerId: container.id
                    };
                  }
                );
                sourceItem.children = sourceChildren;

                if (source === 'import' || source === 'transfer') {
                  sourceItem.selected = true;
                }

                return sourceItem;
              }
              return {
                ...child,
                selected: false,
                children: child?.children
                  ? original(child.children)?.map(unSelectedChild) ?? []
                  : []
              };
            })
          };
        } else {
          if (source !== 'import' && source !== 'transfer') {
            const newSource = container.source?.[source];

            let children = item.children.map(child =>
              unSelectedAndUnExpanded(child)
            );

            if (newSource) {
              const pagesBySource = pages?.length > 0 ? pages : [];

              const sourceChildren = pagesBySource?.map((sourceData, index) => {
                const {id, name} = sourceData;
                return {
                  id,
                  name: name,
                  children: [],
                  numChildren: 0,
                  page: 0,
                  expanded: false,
                  selected: pageId === id,
                  // selected: state.selectedPageId === id index === 0,
                  parentId: source,
                  isPage: true,
                  containerId: container.id
                };
              });
              children.push({
                id: source,
                name: CONTAINER_TREE_SOURCES[source],
                children: sourceChildren,
                numChildren: sourceChildren?.length ?? 0,
                page: 0,
                expanded: true,
                selected: false,
                parentId: container.id,
                isSource: true
              });
              let containerItem = {
                ...item,
                source: {
                  ...item.source,
                  [source]: newSource?.length ?? 0
                },
                expanded: true,
                selected: false,
                children,
                numChildren: children.length
              };
              return containerItem;
            }
            let containerItem = {
              ...item,
              expanded: true,
              selected: false,
              children,
              numChildren: children.length
            };
            return containerItem;
          } else {
            const {import_count, transfer_count} = container;
            let containerItem = {
              ...item,
              expanded:
                source === 'import'
                  ? import_count > 0
                  : source !== 'transfer'
                  ? transfer_count > 0
                  : false,
              selected: false
            };
            if (source === 'import' && import_count === 0) {
              containerItem.selected = true;
            }
            if (source === 'transfer' && transfer_count === 0) {
              containerItem.selected = true;
            }

            let children = item.children.map(child => {
              if (child.id === source) {
                return {
                  ...child,
                  selected: true
                };
              }
              return unSelectedChild(child);
            });

            containerItem.children = children;

            return containerItem;
          }
        }
      }
    }
    return unSelectedChild(item);
  });
  state.containers = newNodes;
  state.containersTemp = newNodes.map(item => unSelectedChild(item));
  state.container = container;
  state.selectedContainerId = container.uuid;
  state.selectedSource = source;
  state.selectedPageId = pageId;
  state.alreadySetContainer = pageId ? true : false;
}

function handleUnExpandContainers(state, action) {
  state.container = null;
  state.selectedContainerId = null;
  state.selectedSource = null;
  state.selectedPageId = null;
  state.containers = state.containersTemp;
  state.expandedIds = [];
  state.alreadySetContainer = false;
  state.keyword = '';
}

function handleExpandSource(state, action) {
  const {sourceId, state: nodeState, containerId} = action.payload;
  const newNodes = [...state.containers].map(item => {
    if (item.id === containerId) {
      return {
        ...item,
        children: item.children.map(child => {
          if (child.id === sourceId) {
            return {
              ...child,
              ...nodeState
            };
          }
          return child;
        })

        // selected: !item.selected
      };
    }
    if (item.id !== state.selectedContainerId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.containers = newNodes;
}

function handleDeletePage(state, action) {
  const newNodes = [...state.containers].map(item => {
    if (item.id === state.selectedContainerId) {
      let isExistPage = true;
      let updatedChild = item.children.map(source => {
        if (source.id === state.selectedSource) {
          let updatedSource = {
            ...source
          };
          updatedSource.children = source.children.filter(
            page => page.id !== state.selectedPageId
          );
          if (!updatedSource.children.length) {
            isExistPage = false;
          }
          return updatedSource;
        }
        return source;
      });

      if (!isExistPage) {
        updatedChild = item.children.filter(
          source => source.id !== state.selectedSource
        );
      }

      return {
        ...item,
        selected: true,
        children: updatedChild,
        expanded: updatedChild?.length ? true : false,
        numChildren: updatedChild.length
      };
    }
    if (item.id !== state.selectedContainerId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.containers = newNodes;
  state.selectedSource = null;
  state.selectedPageId = null;
}

function handleSetFlagAlready(state, action) {
  state.alreadySetContainer = action.payload.flag;
}

function handleUpdatePage(state, action) {
  const {name, pageId} = action.payload;
  const newNodes = [...state.containers].map(item => {
    if (item.id === state.selectedContainerId) {
      return {
        ...item,
        children: item.children.map(child => {
          if (child.id === state.selectedSource) {
            return {
              ...child,
              children: child.children.map(page => {
                if (page.id === pageId) {
                  return {
                    ...page,
                    name
                  };
                }
                return page;
              })
            };
          }
          return child;
        })
      };
    }
    if (item.id !== state.selectedContainerId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.containers = newNodes;
}

function handleToggleCreateEvent(state, action) {
  state.toggleCreateEvent = !state.toggleCreateEvent;
  state.eventId = action.payload.eventId;
}

function handleEventPaging(state, action) {
  const {paging} = action.payload;
  state.eventPaging = paging;
}

function handleCreatePageModal(state, action) {
  const {source} = action.payload;

  state.toggleCreatePageModal = !state.toggleCreatePageModal;
  if (source) {
    state.selectedSource = source;
  }
}

function handleUpdatedContainer(state, action) {
  const {container} = action.payload;

  state.container = container;
  state.containers = [...state.containers].map(item => {
    if (item.id === container.id) {
      const {name, url, status} = container;
      return {
        ...item,
        name,
        url,
        status
      };
    }
    return item;
  });
}

function handleSearchContainers(state, action) {
  const {keyword} = action.payload;
  state.keyword = keyword;
  if (keyword?.length) {
    const newContainers = matchSorter(original(state.containersTemp), keyword, {
      keys: [
        {
          threshold: matchSorter.rankings.CONTAINS,
          key: ['name']
        }
      ]
    });
    state.containers = newContainers;
  } else {
    //
    state.containers = state.containersTemp;
  }
}

function handleToggleCreateContainerModal(state, action) {
  state.toggleCreateContainerModal = !state.toggleCreateContainerModal;
}

function handleCreatedImport(state, action) {
  const {container, source} = action.payload;
  state.container = container;
  state.containers = state.containers.map(containerItem => {
    if (containerItem.id === container.id) {
      let updatedContainerItem = {
        ...containerItem
      };
      updatedContainerItem.importCount += 1;
      const isExistImport = !!containerItem.children.find(
        child => child.id === source
      );
      if (!isExistImport) {
        updatedContainerItem.children.push({
          expanded: true,
          id: source,
          isSource: true,
          name: CONTAINER_TREE_SOURCES[source],
          numChildren: 0,
          page: 0,
          parentId: containerItem.id,
          selected: true,
          children: []
        });
        updatedContainerItem.expanded = true;
        updatedContainerItem.selected = false;
        updatedContainerItem.numChildren += 1;
      }

      return updatedContainerItem;
    }
    return containerItem;
  });
}

// hook to use container reducer
export function useContainerSelector() {
  const state = useSelector(state => state.containerReducer);
  return state;
}

export const containerReducer = (
  initialState = containerInitialState,
  action
) => {
  return createReducer(initialState, action, handleActions);
};
