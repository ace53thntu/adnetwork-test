import {useSelector} from 'react-redux';
import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

const PREFIX = '@common';
const FILE_UPLOADING = `${PREFIX}/FILE_UPLOADING`;
const SET_SELECTED_TREE_NODE = `${PREFIX}/SET_SELECTED_TREE_NODE`;
const SET_SELECT_TREE_DATA = `${PREFIX}/SET_SELECT_TREE_DATA`;

export const commonFileUploadingRedux = (isUploading = false) =>
  createAction(FILE_UPLOADING, {isUploading});

const commonInitialState = {
  isUploading: false
};

const handleActions = {
  [FILE_UPLOADING]: handleFileUploading,
  [SET_SELECTED_TREE_NODE]: handleSetSelectedTreeNode,
  [SET_SELECT_TREE_DATA]: handleSetSelectTreeData,
};

function handleFileUploading(state, action) {
  state.isUploading = action.payload.isUploading;
}

function handleSetSelectedTreeNode(state, action) {
  const {uuid} = action.payload;
  return {
    ...state,
    selectedTreeNode: uuid,
  };
}

function handleSetSelectTreeData(state, action) {
  const {treeData} = action.payload;
  return {
    ...state,
    selectTreeData: treeData,
  };
}

export const setSelectedTreeNodeRedux = uuid => {
  return createAction(SET_SELECTED_TREE_NODE, {
    uuid
  });
};

export const setSelectTreeDataRedux = treeData => {
  return createAction(SET_SELECT_TREE_DATA, {
    treeData
  });
};


export function useCommonSelector() {
  const state = useSelector(state => state.commonReducer);
  return state;
}

export const commonReducer = (initialState = commonInitialState, action) =>
  createReducer(initialState, action, handleActions);
