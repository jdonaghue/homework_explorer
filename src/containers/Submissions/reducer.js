import produce from "immer"

const initialState = {
  submissions: [],
  fetching: false,
  total: 0,
}

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch(action.type) {
      case 'FETCH_SUBMISSIONS':
        draft.fetching = true;
        break;
      case 'FETCH_SUBMISSIONS_SUCCEEDED':
        draft.submissions = action.submissions;
        draft.fetching = false;
        break;
      default:
        break;
    }
  });
};
