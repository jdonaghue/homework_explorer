import produce from "immer"

const initialState = {
  assignments: [],
  fetching: false,
  total: 0,
  page: null,
}

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch(action.type) {
      case 'FETCH_ASSIGNMENTS':
        draft.fetching = true;
        draft.page = action.page || 1;
        break;
      case 'FETCH_ASSIGNMENTS_SUCCEEDED':
        draft.assignments = action.assignments;
        draft.total = action.total;
        draft.fetching = false;
        break;
      default:
        break;
    }
  });
};
