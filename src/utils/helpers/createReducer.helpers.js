import createNextState from 'immer';

export function createReducer(initialState = {}, action, actionsMap) {
  return createNextState(initialState, draft => {
    const caseReducer = actionsMap[action.type];
    return caseReducer ? caseReducer(draft, action) : undefined;
  });
}
