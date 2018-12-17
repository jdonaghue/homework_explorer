import { createSelector } from 'reselect'

const selectRootAssignments = state => state.assignments;

export const selectAssignments = createSelector(
  selectRootAssignments,
  state => state.assignments,
);

export const selectTotal = createSelector(
  selectRootAssignments,
  state => state.total,
);

export const selectFetching = createSelector(
  selectRootAssignments,
  state => state.fetching,
);

export const selectPage = createSelector(
  selectRootAssignments,
  state => state.page,
);

export const selectAssignment = assignmentId => (
  createSelector(
    selectAssignments,
    assignments => assignments.find(
      assignment => assignment.id === Number(assignmentId)),
  )
);
