import {original} from 'immer';
import {matchSorter} from 'match-sorter';
import {
  unSelectedAndUnExpanded,
  unSelectedChild
} from 'pages/Container/components/Tree/utils';
import React from 'react';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

// dispatch action types
const PREFIX = '@campaign_management';
const RESET = `${PREFIX}/RESET`;
const SET_ADVERTISERS = `${PREFIX}/SET_ADVERTISERS`;

const SELECT_ADVERTISER_ID = `${PREFIX}/SELECT_ADVERTISER_ID`;
const EXPAND_ADVERTISER = `${PREFIX}/EXPAND_ADVERTISER`;
const SET_ADVERTISER = `${PREFIX}/SET_ADVERTISER`;
const UN_EXPAND_ADVERTISERS = `${PREFIX}/UN_EXPAND_ADVERTISERS`;
const SEARCH_CAMPAIGNS = `${PREFIX}/SEARCH_CAMPAIGNS`;
const EXPAND_CAMPAIGN = `${PREFIX}/EXPAND_CAMPAIGN`;
const SET_CAMPAIGN = `${PREFIX}/SET_CAMPAIGN`;
const SET_STRATEGY = `${PREFIX}/SET_STRATEGY`;

const SELECT_STRATEGY_ID = `${PREFIX}/SELECT_STRATEGY_ID`;
const SET_STRATEGY_INVENTORY_LIST = `${PREFIX}/SET_STRATEGY_INVENTORY_LIST`;
const SET_STRATEGY_INVENTORY_LIST_TEMP = `${PREFIX}/SET_STRATEGY_INVENTORY_LIST_TEMP`;
const REMOVE_INVENTORY_STRATEGY = `${PREFIX}/REMOVE_INVENTORY_STRATEGY`;
const INIT_INVENTORY_STRATEGY = `${PREFIX}/INIT_INVENTORY_STRATEGY`;
const LOAD_CAMPAIGN = `${PREFIX}/LOAD_CAMPAIGN`;

// dispatch actions
export const loadCampaignRedux = campaigns =>
  createAction(LOAD_CAMPAIGN, {campaigns});

export const initStrategyInventoryListRedux = ({
  inventoryList = [],
  inventoryTempList = []
}) => {
  return createAction(INIT_INVENTORY_STRATEGY, {
    inventoryList,
    inventoryTempList
  });
};
export const removeInventoryStrategyRedux = (inventoryId = []) => {
  return createAction(REMOVE_INVENTORY_STRATEGY, {inventoryId});
};
export const setStrategyInventoryListRedux = ({inventoryList = []}) => {
  return createAction(SET_STRATEGY_INVENTORY_LIST, {inventoryList});
};
export const setStrategyInventoryTempListRedux = ({inventoryList = []}) => {
  return createAction(SET_STRATEGY_INVENTORY_LIST_TEMP, {inventoryList});
};
export const resetCampaignRedux = () => {
  return createAction(RESET, {});
};

export const setAdvertisersRedux = (data, page) => {
  return createAction(SET_ADVERTISERS, {data, page});
};
export const selectAdvertiserRedux = (advertiserId, advertiser) => {
  return createAction(SELECT_ADVERTISER_ID, {advertiserId, advertiser});
};
export const expandAdvertiserRedux = (advertiserId, state) => {
  return createAction(EXPAND_ADVERTISER, {advertiserId, state});
};
export const setAdvertiserRedux = (
  advertiser,
  campaigns,
  strategyId,
  strategies
) => {
  return createAction(SET_ADVERTISER, {
    advertiser,
    campaigns,
    strategyId,
    strategies
  });
};
export const unExpandAdvertisersRedux = () => {
  return createAction(UN_EXPAND_ADVERTISERS, {});
};

// Campaign
export const expandCampaignRedux = (campaignId, state, advertiserId) => {
  return createAction(EXPAND_CAMPAIGN, {campaignId, state, advertiserId});
};

export const setCampaignRedux = (advertiserId, campaignId, campaigns = []) => {
  return createAction(SET_CAMPAIGN, {advertiserId, campaignId, campaigns});
};

// Strategy
export const selectStrategyRedux = (strategyId, strategy) => {
  return createAction(SELECT_STRATEGY_ID, {strategyId, strategy});
};
export const setStrategyRedux = (
  advertiserId,
  campaignId,
  strategyId,
  campaigns = [],
  strategies = []
) => {
  return createAction(SET_STRATEGY, {
    advertiserId,
    campaignId,
    strategyId,
    campaigns,
    strategies
  });
};

export const searchCampaignRedux = keyword => {
  return createAction(SEARCH_CAMPAIGNS, {keyword});
};

const campaignInitialState = {
  advertisers: [],
  advertisersTemp: [],
  isLoading: true,
  selectedAdvertiserId: null,
  expandedIds: [],
  selectedCampaign: null,
  advertiser: null,
  selectedStrategyId: null,
  alreadySetAdvertiser: false,
  keyword: '',
  inventoryList: [],
  inventoryTempList: [],
  advertiserPage: 1
};

const handleActions = {
  [LOAD_CAMPAIGN]: handleLoadCampaign,
  [INIT_INVENTORY_STRATEGY]: initInventoryStrategyList,
  [REMOVE_INVENTORY_STRATEGY]: removeInventoryStrategyList,
  [SET_STRATEGY_INVENTORY_LIST]: handleSetStrategyInventoryList,
  [SET_STRATEGY_INVENTORY_LIST_TEMP]: setStrategyInventoryTempList,
  [RESET]: handleReset,
  [SET_ADVERTISERS]: handleSetAdvertisers,
  [SET_ADVERTISER]: handleSetAdvertiser,
  [SELECT_ADVERTISER_ID]: handleSelectAdvertiser,
  [EXPAND_ADVERTISER]: handleExpandAdvertiser,
  [UN_EXPAND_ADVERTISERS]: handleUnExpandContainers,
  [SEARCH_CAMPAIGNS]: handleSearchCampaigns,
  [EXPAND_CAMPAIGN]: handleExpandCampaign,
  [SET_CAMPAIGN]: handleSetCampaign,
  [SET_STRATEGY]: handleSetStrategy
};

function handleLoadCampaign(state, action) {
  const {campaigns} = action.payload;

  const newNodes = [...state.advertisers].map(item => {
    const childLen = item.children?.length ?? 0;
    if (
      item.id === state.selectedAdvertiserId &&
      campaigns.length !== childLen
    ) {
      return {
        ...item,
        expanded: true,
        children: [...campaigns]?.map(({uuid, name}) => ({
          id: uuid,
          name,
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: state.selectedCampaignId === uuid,
          parentId: state.selectedAdvertiserId,
          isCampaign: true
        }))
      };
    }
    return item;
  });
  state.advertisers = newNodes;
}

function initInventoryStrategyList(state, action) {
  const {inventoryList = [], inventoryTempList = []} = action.payload;
  state.inventoryList = inventoryList;
  state.inventoryTempList = inventoryTempList;
}

function removeInventoryStrategyList(state, action) {
  const {inventoryId} = action.payload;
  state.inventoryList = state.inventoryList?.filter(
    item => item.uuid !== inventoryId
  );
  state.inventoryTempList = state.inventoryTempList?.filter(
    item => item.uuid !== inventoryId
  );
}

function handleSetStrategyInventoryList(state, action) {
  const {inventoryList = []} = action.payload;
  state.inventoryList = inventoryList;
}

function setStrategyInventoryTempList(state, action) {
  const {inventoryList = []} = action.payload;
  state.inventoryTempList = inventoryList;
}

function handleReset(state) {
  state.advertisers = [];
  state.advertisersTemp = [];
  state.isLoading = true;
  state.selectedAdvertiserId = null;
  state.expandedIds = [];
  state.selectedCampaign = null;
  state.advertiser = null;
  state.selectedStrategyId = null;
  state.alreadySetAdvertiser = false;
  state.keyword = '';
  state.advertiserPage = 1;
}

function handleSetAdvertisers(state, action) {
  const {page, data} = action.payload;

  if (page > state.advertiserPage) {
    state.advertiserPage = page;
    state.advertisers = [...state.advertisers, ...data];
    state.advertisersTemp = [...state.advertisersTemp, ...data];
  } else {
    state.advertisers = data;
    state.advertisersTemp = data;
  }

  state.isLoading = false;
}

function handleSelectAdvertiser(state, action) {
  const {advertiserId, advertiser} = action.payload;

  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      return {
        ...item,
        selected: true,
        children: [...item.children].map(child => unSelectedChild(child))
      };
    }
    return unSelectedAndUnExpanded(item);
  });
  state.selectedAdvertiserId = advertiserId;
  state.advertisers = newNodes;
  state.keyword = '';
  state.advertiser = advertiser;
  state.selectedCampaign = null;
  state.selectedStrategyId = null;
}

function handleExpandAdvertiser(state, action) {
  const {advertiserId, state: nodeState} = action.payload;
  if (state.expandedIds.includes(advertiserId)) {
    state.expandedIds = state.expandedIds.filter(
      advId => advId !== advertiserId
    );
  } else {
    state.expandedIds = [...state.expandedIds, advertiserId];
  }

  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      return {
        ...item,
        expanded: !item.expanded,
        ...nodeState
      };
    }
    if (item.id !== state.selectedAdvertiserId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.advertisers = newNodes;
}

function handleSetAdvertiser(state, action) {
  // const {advertiser, campaigns, strategyId, strategies = []} = action.payload;
  // const newNodes = [...state.advertisers].map(item => {
  //   if (item.id === advertiser.id) {
  //     //
  //     if (!item.expanded) {
  //       let advertiserItem = {
  //         ...item,
  //         expanded: true,
  //         selected: false
  //       };
  //       let children = [];
  //       advertiserItem.children = children.map(child => {
  //         if (child.id === campaign.id) {
  //           let campaignItem = {
  //             ...child,
  //             expanded: true,
  //             selected: false
  //           };
  //           if (child.id !== 'import' && child.id !== 'transfer') {
  //             const pagesBySource = pages?.length > 0 ? pages : child?.children;
  //             const sourceChildren = pagesBySource?.map((sourceData, index) => {
  //               const {id, name} = sourceData;
  //               return {
  //                 id,
  //                 name: name,
  //                 children: [],
  //                 numChildren: 0,
  //                 page: 0,
  //                 expanded: false,
  //                 selected: pageId === id,
  //                 parentId: child.id,
  //                 isPage: true,
  //                 containerId: container.id
  //               };
  //             });
  //             sourceItem.children = sourceChildren;
  //           } else {
  //             sourceItem.selected = true;
  //           }
  //           return sourceItem;
  //         }
  //         return {
  //           ...child,
  //           selected: false,
  //           expanded: false
  //         };
  //       });
  //       if (item.numChildren <= 0) {
  //         containerItem.numChildren = containerItem.children.length;
  //       }
  //       return containerItem;
  //     } else {
  //       const isExistSource = !!item.children.find(
  //         sourceNe => sourceNe.id === source
  //       );
  //       if (isExistSource) {
  //         return {
  //           ...item,
  //           expanded: true,
  //           selected: false,
  //           children: [...item.children].map(child => {
  //             if (child.id === source) {
  //               let sourceItem = {
  //                 ...child,
  //                 expanded: true,
  //                 selected: false
  //               };
  //               const pagesBySource =
  //                 pages?.length > 0 ? pages : child?.children;
  //               const sourceChildren = pagesBySource?.map(
  //                 (sourceData, index) => {
  //                   const {id, name} = sourceData;
  //                   return {
  //                     id,
  //                     name: name,
  //                     children: [],
  //                     numChildren: 0,
  //                     page: 0,
  //                     expanded: false,
  //                     selected: pageId === id,
  //                     // selected: state.selectedPageId === id index === 0,
  //                     parentId: child.id,
  //                     isPage: true,
  //                     containerId: container.id
  //                   };
  //                 }
  //               );
  //               sourceItem.children = sourceChildren;
  //               if (source === 'import' || source === 'transfer') {
  //                 sourceItem.selected = true;
  //               }
  //               return sourceItem;
  //             }
  //             return {
  //               ...child,
  //               selected: false,
  //               children: child?.children
  //                 ? original(child.children)?.map(unSelectedChild) ?? []
  //                 : []
  //             };
  //           })
  //         };
  //       } else {
  //         if (source !== 'import' && source !== 'transfer') {
  //           const newSource = container.source?.[source];
  //           let children = item.children.map(child =>
  //             unSelectedAndUnExpanded(child)
  //           );
  //           if (newSource) {
  //             const sourceChildren = newSource?.map((sourceData, index) => {
  //               const {id, name} = sourceData;
  //               return {
  //                 id,
  //                 name,
  //                 children: [],
  //                 numChildren: 0,
  //                 page: 0,
  //                 expanded: false,
  //                 selected: pageId === id,
  //                 parentId: source,
  //                 isPage: true,
  //                 containerId: container.id
  //               };
  //             });
  //             children.push({
  //               id: source,
  //               name: CONTAINER_TREE_SOURCES[source],
  //               children: sourceChildren,
  //               numChildren: newSource?.length ?? 0,
  //               page: 0,
  //               expanded: true,
  //               selected: false,
  //               parentId: container.id,
  //               isSource: true
  //             });
  //             let containerItem = {
  //               ...item,
  //               source: {
  //                 ...item.source,
  //                 [source]: newSource?.length ?? 0
  //               },
  //               expanded: true,
  //               selected: false,
  //               children,
  //               numChildren: children.length
  //             };
  //             return containerItem;
  //           }
  //           let containerItem = {
  //             ...item,
  //             expanded: true,
  //             selected: false,
  //             children,
  //             numChildren: children.length
  //           };
  //           return containerItem;
  //         } else {
  //           const {import_count, transfer_count} = container;
  //           let containerItem = {
  //             ...item,
  //             expanded:
  //               source === 'import'
  //                 ? import_count > 0
  //                 : source !== 'transfer'
  //                 ? transfer_count > 0
  //                 : false,
  //             selected: false
  //           };
  //           if (source === 'import' && import_count === 0) {
  //             containerItem.selected = true;
  //           }
  //           if (source === 'transfer' && transfer_count === 0) {
  //             containerItem.selected = true;
  //           }
  //           let children = item.children.map(child => {
  //             if (child.id === source) {
  //               return {
  //                 ...child,
  //                 selected: true
  //               };
  //             }
  //             return unSelectedChild(child);
  //           });
  //           containerItem.children = children;
  //           return containerItem;
  //         }
  //       }
  //     }
  //   }
  //   return unSelectedChild(item);
  // });
  // state.containers = newNodes;
  // state.containersTemp = newNodes.map(item => unSelectedChild(item));
  // state.container = container;
  // state.selectedContainerId = container.uuid;
  // state.selectedSource = source;
  // state.selectedPageId = pageId;
  // state.alreadySetContainer = pageId ? true : false;
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

function handleExpandCampaign(state, action) {
  const {campaignId, state: nodeState, advertiserId} = action.payload;
  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      return {
        ...item,
        children: item.children.map(child => {
          if (child.id === campaignId) {
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
    if (item.id !== state.selectedAdvertiserId) {
      return unSelectedChild(item);
    }
    return item;
  });
  state.advertisers = newNodes;
}

function handleSetCampaign(state, action) {
  const {advertiserId, campaignId, campaigns = []} = action.payload;
  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      //
      if (!item.expanded) {
        let advertiserItem = {
          ...item,
          expanded: true,
          selected: false
        };
        let children = [...campaigns];
        advertiserItem.children = children.map(child => {
          if (child.id === campaignId) {
            let campaignItem = {
              ...child,
              expanded: true,
              selected: true
            };

            return campaignItem;
          }
          return {
            ...child,
            selected: false,
            expanded: false
          };
        });
        if (item.numChildren <= 0) {
          advertiserItem.numChildren = advertiserItem.children.length;
        }
        return advertiserItem;
      } else {
        return {
          ...item,
          expanded: true,
          selected: false,
          children: [...item.children].map(campItem => {
            if (campItem.id === campaignId) {
              return {
                ...unSelectedChild(campItem),
                selected: true
              };
            }
            return unSelectedChild(campItem);
          })
        };
      }
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
  state.advertisersTemp = newNodes.map(item => unSelectedChild(item));
  state.selectedContainId = advertiserId;
  state.selectedCampaign = campaignId;
  // state.selectedPageId = pageId;
  state.alreadySetAdvertiser = true;
}

function handleSetStrategy(state, action) {
  const {
    advertiserId,
    campaignId,
    strategyId,
    campaigns,
    strategies
  } = action.payload;
  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      //
      if (!item.expanded) {
        let advertiserItem = {
          ...item,
          expanded: true,
          selected: false
        };
        let children = [...campaigns];

        advertiserItem.children = children.map(child => {
          if (child.id === campaignId) {
            let campaignItem = {
              ...child,
              expanded: true,
              selected: false,
              children: [...strategies].map(strateyItem => {
                if (strateyItem.id === strategyId) {
                  return {
                    ...strateyItem,
                    selected: true
                  };
                }
                return unSelectedChild(strateyItem);
              })
            };

            return campaignItem;
          }
          return {
            ...child,
            selected: false,
            expanded: false
          };
        });
        if (item.numChildren <= 0) {
          advertiserItem.numChildren = advertiserItem.children.length;
        }
        return advertiserItem;
      } else {
        return {
          ...item,
          expanded: true,
          selected: false,
          children: [...item.children].map(campItem => {
            if (campItem.id === campaignId) {
              return {
                ...campItem,
                selected: false,
                children: [...campItem.children].map(strateyItem => {
                  if (strateyItem.id === strategyId) {
                    return {
                      ...strateyItem,
                      selected: true
                    };
                  }
                  return unSelectedChild(strateyItem);
                })
              };
            }
            return unSelectedChild(campItem);
          })
        };
      }
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
  state.advertisersTemp = newNodes.map(item => unSelectedChild(item));
  state.selectedAdvertiserId = advertiserId;
  state.selectedCampaign = campaignId;
  state.selectedStrategyId = strategyId;
  state.alreadySetAdvertiser = true;
}

function handleSearchCampaigns(state, action) {
  const {keyword} = action.payload;
  state.keyword = keyword;
  if (keyword?.length) {
    const newAdvertisers = matchSorter(
      original(state.advertisersTemp),
      keyword,
      {
        keys: [
          {
            threshold: matchSorter.rankings.CONTAINS,
            key: ['name']
          }
        ]
      }
    );
    state.advertisers = newAdvertisers;
  } else {
    //
    state.advertisers = state.advertisersTemp;
  }
}

// Selector
const makeSelectStrategyInventory = () =>
  createSelector(
    state => state.campaignReducer,
    a => a.inventoryList
  );

const makeSelectStrategyInventoryTemp = () =>
  createSelector(
    state => state.campaignReducer,
    a => a.inventoryTempList
  );

// hook to use container reducer
export function useCampaignSelector() {
  const state = useSelector(state => state.campaignReducer);
  return state;
}

export function useStrategyInventorySelector() {
  const selectStrategyInventories = React.useMemo(
    makeSelectStrategyInventory,
    []
  );
  return useSelector(state => selectStrategyInventories(state));
}

export function useStrategyInventoryTempSelector() {
  const selectInventoriesTemp = React.useMemo(
    makeSelectStrategyInventoryTemp,
    []
  );
  return useSelector(state => selectInventoriesTemp(state));
}

export const campaignReducer = (
  initialState = campaignInitialState,
  action
) => {
  return createReducer(initialState, action, handleActions);
};
