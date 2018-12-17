import { createSelector } from 'reselect'

const selectRootSubmissions = state => state.submissions;

export const selectSubmissions = createSelector(
  selectRootSubmissions,
  state => state.submissions,
);

export const selectFetching = createSelector(
  selectRootSubmissions,
  state => state.fetching,
);

export const selectSubmission = submissionId => (
  createSelector(
    selectSubmissions,
    submissions => submissions.find(
      submission => submission.id === Number(submissionId)),
  )
);
