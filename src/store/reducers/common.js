import {useSelector} from 'react-redux';
import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

const FILE_UPLOADING = '@common/FILE_UPLOADING';

export const commonFileUploadingRedux = (isUploading = false) =>
  createAction(FILE_UPLOADING, {isUploading});

const commonInitialState = {
  isUploading: false
};

const handleActions = {
  [FILE_UPLOADING]: handleFileUploading
};

function handleFileUploading(state, action) {
  state.isUploading = action.payload.isUploading;
}

export function useCommonSelector() {
  const state = useSelector(state => state.commonReducer);
  return state;
}

export const commonReducer = (initialState = commonInitialState, action) =>
  createReducer(initialState, action, handleActions);
