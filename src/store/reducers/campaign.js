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
const UPDATE_CAMPAIGN = `${PREFIX}/UPDATE_CAMPAIGN`;

// dispatch actions
export const updateCampaignRedux = campaign =>
  createAction(UPDATE_CAMPAIGN, {campaign});

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

export const setAdvertisersRedux = (
  data,
  page,
  total,
  advId,
  campaignId,
  campaigns
) => {
  return createAction(SET_ADVERTISERS, {
    data,
    page,
    total,
    advId,
    campaignId,
    campaigns
  });
};
export const selectAdvertiserRedux = (advertiserId, advertiser) => {
  return createAction(SELECT_ADVERTISER_ID, {advertiserId, advertiser});
};
export const expandAdvertiserRedux = (advertiserId, state) => {
  return createAction(EXPAND_ADVERTISER, {advertiserId, state});
};
export const setAdvertiserRedux = advertiserId => {
  return createAction(SET_ADVERTISER, {
    advertiserId
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

export const selectedStrategyIdRedux = strategyId => {
  return createAction(SELECT_STRATEGY_ID, {strategyId});
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
  advertiserPage: 1,
  advertiserTotalPage: 1,
  activatedStrategyId: ''
};

const handleActions = {
  [SELECT_STRATEGY_ID]: handleSelectStrategyId,
  [UPDATE_CAMPAIGN]: handleUpdateCampaign,
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

function handleSelectStrategyId(state, action) {
  const {strategyId} = action.payload;
  state.activatedStrategyId = strategyId;
}

function handleUpdateCampaign(state, action) {
  const {campaign} = action.payload;
  const newNodes = [...state.advertisers].map(item => {
    if (item.children.length > 0) {
      const newChildren = item.children.map(campItem => {
        if (campItem.id === campaign.uuid) {
          return {...campItem, name: campaign.name};
        }
        return campItem;
      });
      return {
        ...item,
        children: newChildren
      };
    }

    return item;
  });
  state.advertisers = newNodes;
}

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
  state = campaignInitialState;
}

function handleSetAdvertisers(state, action) {
  const {page, data, total, advId, campaigns = [], campaignId} = action.payload;

  if (page > state.advertiserPage) {
    state.advertisers = [...state.advertisers, ...data];
    state.advertisersTemp = [...state.advertisersTemp, ...data];
  } else {
    state.advertisersTemp = data;

    if (advId) {
      state.advertisers = data.map(adv => {
        if (adv.id === advId) {
          if (campaigns?.length) {
            return {
              ...adv,
              expanded: true,
              children: campaigns.map(camp => {
                if (camp.id === campaignId) {
                  return {
                    ...camp,
                    selected: true
                  };
                }
                return camp;
              }),
              numChildren: campaigns.length
            };
          }
          return {
            ...adv,
            expanded: true
          };
        }
        return adv;
      });
    } else {
      state.advertisers = data;
    }
  }
  state.advertiserTotalPage = total;
  state.advertiserPage = page;
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
  const {advertiserId} = action.payload;
  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      const newItem = unSelectedChild(item);
      return {
        ...newItem,
        selected: true
      };
    }

    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
  state.advertisersTemp = newNodes.map(item => unSelectedChild(item));
  state.selectedAdvertiserId = advertiserId;
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
              console.log('=== Selected campaignId', campaignId);
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
  state.selectedAdvertiserId = advertiserId;
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

const makeSelectedStrategyId = () =>
  createSelector(
    state => state.campaignReducer,
    a => a.activatedStrategyId
  );

// hook to use campaign reducer
export function useSelectedStrategyIdSelector() {
  const selectedStrategyId = React.useMemo(makeSelectedStrategyId, []);
  return useSelector(state => selectedStrategyId(state));
}
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
