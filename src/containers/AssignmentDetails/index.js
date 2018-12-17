import React, { Component } from 'react';
import styled from 'styled-components';
import { Tab, Container } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Assignment from 'components/assignment';
import Submissions from 'containers/Submissions';
import { selectAssignment } from 'containers/Assignments/selectors';

export const Wrapper = styled(Container)`
  && {
    border: 1px solid #d4d4d5;
    margin: 45px;
    padding: 15px;
  }
`;

export class AssignmentsDetails extends Component {
  render() {
    const { assignment } = this.props;

    return assignment ? (
      <Tab
        panes={[
          {
            menuItem: 'Assignment',
            render: () => <Assignment assignment={assignment} />,
          },
          {
            menuItem: 'Submissions',
            render: () => <Submissions assignmentId={assignment.id} />,
          },
        ]}
      />
    ) : (
      <Wrapper>
        Select an assignment
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  assignment: selectAssignment(props.assignmentId)(state)
})

const ConnectedAssignmentDetails = connect(
  mapStateToProps,
)(AssignmentsDetails);

export default ConnectedAssignmentDetails;
