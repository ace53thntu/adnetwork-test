import {original} from 'immer';
import {unSelectedChild} from 'pages/Creative/components/AdvertisersTree/utils';
import {TABS} from 'pages/Creative/components/CreativeCreate/constants';
import {useSelector} from 'react-redux';
import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

// dispatch action types
const RESET = '@creative/RESET';

const ADVERTISERS = '@creative/ADVERTISERS';
const SELECT_ADVERTISER = '@creative/SELECT_ADVERTISER';
const EXPAND_ADVERTISER = '@creative/EXPAND_ADVERTISER';

const DELETE_CONCEPT = '@creative/DELETE_CONCEPT';
const SELECT_CONCEPT = '@creative/SELECT_CONCEPT';
const LOAD_CONCEPT = '@creative/LOAD_CONCEPT';
const LOAD_MORE_CONCEPT = '@creative/LOAD_MORE_CONCEPT';
const UPDATE_CONCEPT = '@creative/UPDATE_CONCEPT';
const ADD_CONCEPT = '@creative/ADD_CONCEPT';

const TOGGLE_CREATE_CREATIVE_DIALOG = '@creative/TOGGLE_CREATE_CREATIVE_DIALOG';
const TOGGLE_DETAIL_DIALOG = '@creative/TOGGLE_DETAIL_DIALOG';
const DIRTY_FORM = '@creative/DIRTY_FORM';

// dispatch actions
export const resetCreativeRedux = () => createAction(RESET, {});

export const setAdvertisersRedux = (data, page) =>
  createAction(ADVERTISERS, {data, page});
export const selectAdvertiserRedux = id =>
  createAction(SELECT_ADVERTISER, {id});
export const expandAdvertiserRedux = (id, state) =>
  createAction(EXPAND_ADVERTISER, {id, nodeState: state});

export const deleteConceptRedux = (conceptId, advertiserId) =>
  createAction(DELETE_CONCEPT, {conceptId, advertiserId});
export const selectConceptRedux = (conceptId, advertiserId) =>
  createAction(SELECT_CONCEPT, {conceptId, advertiserId});
export const loadConceptRedux = concepts =>
  createAction(LOAD_CONCEPT, {concepts});
export const loadMoreConceptRedux = (concepts, advertiserId) =>
  createAction(LOAD_MORE_CONCEPT, {concepts, advertiserId});
export const updateConceptRedux = (conceptId, concept) =>
  createAction(UPDATE_CONCEPT, {conceptId, concept});
export const addConceptRedux = concept => createAction(ADD_CONCEPT, {concept});

export const toggleCreateCreativeDialog = activeTab =>
  createAction(TOGGLE_CREATE_CREATIVE_DIALOG, {activeTab});

export const toggleCreativeDetailDialog = (creativeId, detailOf = '') =>
  createAction(TOGGLE_DETAIL_DIALOG, {creativeId, detailOf});

export const dirtyForm = val => createAction(DIRTY_FORM, {val});

const creativeInitialState = {
  advertisers: [],
  isLoading: true,
  selectedAdvertiserId: null,
  selectedConceptId: null,
  expandedIds: [],
  advertiserPage: 1,
  isToggleCreateCreativeDialog: false,
  activeTab: TABS.banner,
  toggleDetailDialog: false,
  detailOf: '',
  selectedCreativeId: null,
  dirtyForm: false,
  isUploading: false,
  alreadySetAdv: false
};

const handleActions = {
  [RESET]: handleReset,
  [ADVERTISERS]: handleSetAdvertisers,
  [SELECT_ADVERTISER]: handleSelectAdvertiser,
  [EXPAND_ADVERTISER]: handleExpandAdvertiser,
  [DELETE_CONCEPT]: handleDeleteConcept,
  [SELECT_CONCEPT]: handleSelectConcept,
  [LOAD_CONCEPT]: handleLoadConcept,
  [LOAD_MORE_CONCEPT]: handleLoadMoreConcept,
  [UPDATE_CONCEPT]: handleUpdateConcept,
  [ADD_CONCEPT]: handleAddConcept,
  [TOGGLE_CREATE_CREATIVE_DIALOG]: handleToggleCreateCreativeDialog,
  [TOGGLE_DETAIL_DIALOG]: handleToggleCreativeDetailDialog,
  [DIRTY_FORM]: handleDirtyForm
};

function handleDirtyForm(state, action) {
  state.dirtyForm = action.payload.val;
}

function handleReset(state) {
  state.advertisers = [];
  state.isLoading = true;
  state.selectedAdvertiserId = null;
  state.selectedConceptId = null;
  state.expandedIds = [];
  state.advertiserPage = 1;
  state.isToggleCreateCreativeDialog = false;
  state.activeTab = TABS.banner;
  state.toggleDetailDialog = false;
  state.selectedCreativeId = null;
  state.dirtyForm = false;
  state.isUploading = false;
  state.detailOf = '';
}

function handleSetAdvertisers(state, action) {
  const {page, data} = action.payload;

  if (page > state.advertiserPage) {
    state.advertiserPage = page;
    state.advertisers = [...state.advertisers, ...data];
  } else {
    state.advertisers = data;
  }

  state.isLoading = false;
}

function handleSelectAdvertiser(state, action) {
  const id = action.payload.id;
  state.selectedAdvertiserId = id;
  state.selectedConceptId = null;

  const newNodes = [...state.advertisers].map(item => {
    if (item.id === id) {
      return {
        ...item,
        selected: true,
        children: [...item.children].map(child => unSelectedChild(child))
      };
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
}

function handleExpandAdvertiser(state, action) {
  const {id, nodeState} = action.payload;

  if (state.expandedIds.includes(id)) {
    state.expandedIds = state.expandedIds.filter(advId => advId !== id);
  } else {
    state.expandedIds = [...state.expandedIds, id];
  }

  const newNodes = [...state.advertisers].map(item => {
    if (item.id === id) {
      return {
        ...item,
        expanded: !item.expanded,
        ...nodeState
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

function handleDeleteConcept(state, action) {
  const {conceptId, advertiserId} = action.payload;

  const newNodes = [...state.advertisers].map(item => {
    if (item.id === advertiserId) {
      const included = state.expandedIds.includes(advertiserId);
      const child = [...item.children].filter(child => child.id !== conceptId);

      return {
        ...item,
        numChildren: item.numChildren - 1,
        children: included ? child : [],
        selected: included && child.length === 0 ? true : item.selected
      };
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
}

function handleSelectConcept(state, action) {
  const {conceptId, advertiserId} = action.payload;
  state.selectedConceptId = conceptId;
  state.selectedAdvertiserId = advertiserId;

  if (state.expandedIds.includes(advertiserId)) {
    //
  } else {
    state.expandedIds = [...state.expandedIds, advertiserId];
  }

  const newNodes = [...original(state.advertisers)].map(item => {
    if (item.id === advertiserId) {
      return {
        ...item,
        expanded: true,
        selected: conceptId ? false : true,
        children: [...item.children].map(child => {
          if (child.id === conceptId) {
            return {
              ...child,
              selected: true
            };
          }
          return {
            ...child,
            selected: false
          };
        })
      };
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
}

function handleLoadConcept(state, action) {
  const {concepts} = action.payload;

  const newNodes = [...original(state.advertisers)].map(item => {
    const childLen = item.children?.length ?? 0;
    if (
      item.id === state.selectedAdvertiserId &&
      concepts.length !== childLen
    ) {
      return {
        ...item,
        expanded: true,
        page: item.page + 1,
        children: [...concepts]?.map(({uuid, name}) => ({
          id: uuid,
          name,
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: state.selectedConceptId === uuid,
          parentId: state.selectedAdvertiserId,
          isConcept: true
        }))
      };
    }
    return item;
  });
  state.advertisers = newNodes;
}

function handleLoadMoreConcept(state, action) {
  const {concepts, advertiserId} = action.payload;

  const newNodes = [...original(state.advertisers)].map(item => {
    if (item.id === advertiserId) {
      const newConcepts = [...concepts].map(concept => ({
        ...concept,
        selected: state.selectedConceptId === concept.id
      }));
      return {
        ...item,
        page: item.page + 1,
        children: [...item.children, ...newConcepts]
      };
    }
    return item;
  });
  state.advertisers = newNodes;
}

function handleUpdateConcept(state, action) {
  const {concept, conceptId} = action.payload;

  const {name, advertiser_uuid} = concept;

  const newNodes = state.advertisers.map(item => {
    if (item.id === advertiser_uuid) {
      const included = state.expandedIds.includes(advertiser_uuid);

      return {
        ...item,
        children: included
          ? item.children.map(conceptItem => {
              if (conceptItem.id === conceptId) {
                return {
                  ...conceptItem,
                  name
                };
              }
              return conceptItem;
            })
          : []
      };
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
}

function handleAddConcept(state, action) {
  const {concept} = action.payload;

  const {name, advertiser_uuid, uuid} = concept;

  const newNodes = state.advertisers.map(item => {
    if (item.id === advertiser_uuid) {
      return {
        ...item,
        numChildren: item.numChildren + 1,
        children: state.expandedIds.includes(advertiser_uuid)
          ? [
              ...item.children,
              {
                id: uuid,
                name,
                children: [],
                numChildren: 0,
                page: 0,
                expanded: false,
                selected: state.selectedConceptId === uuid,
                parentId: advertiser_uuid,
                isConcept: true
              }
            ]
          : []
      };
    }
    return unSelectedChild(item);
  });
  state.advertisers = newNodes;
}

function handleToggleCreateCreativeDialog(state, action) {
  state.isToggleCreateCreativeDialog = !state.isToggleCreateCreativeDialog;
  state.activeTab = action.payload.activeTab || TABS.banner;
}

function handleToggleCreativeDetailDialog(state, action) {
  state.selectedCreativeId = action.payload.creativeId;
  state.detailOf = action.payload.detailOf;
  state.toggleDetailDialog = !state.toggleDetailDialog;
}

export function useCreativeSelector() {
  const state = useSelector(state => state.creativeReducer);
  return state;
}

export const creativeReducer = (initialState = creativeInitialState, action) =>
  createReducer(initialState, action, handleActions);
