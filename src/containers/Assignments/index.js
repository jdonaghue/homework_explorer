import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Container, Header, Segment, Pagination } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { injectAsyncReducer, injectSaga } from 'store';
import reducer from 'containers/Assignments/reducer';
import * as actions from 'containers/Assignments/actions';
import saga from 'containers/Assignments/saga';
import {
  selectAssignments,
  selectTotal,
  selectFetching,
  selectPage
} from 'containers/Assignments/selectors';

export const StyledSegment = styled(Segment)`
  cursor: pointer;
  min-height: 60px;

  &&.selected {
    background: gray;
    color: white;

    a {
      color: white;
    }

    h3 {
      color: white;
    }
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;

    &:hover {
      color: black;
    }

    &:active {
      color: white;
    }
  }

  &&:hover {
    background: lightgray;
  }

  &&:active {
    background: gray;
    color: white;

    h3 {
      color: white;
    }
  }
`;

export class Assignments extends Component {
  componentDidMount() {
    const { assignments, page } = this.props
    if (assignments.length === 0) {
      this.props.fetchAssignments(page);
    }
  }

  fetchAssignments = (__, { activePage } = {}) => {
    this.props.fetchAssignments(activePage);
  }

  render() {
    const {
      assignments = [],
      assignmentId,
      total,
      fetching,
      page
    } = this.props;

    return (
      <Container>
        <Header as="h1">Assignments</Header>
        <Segment.Group>
          {
            !fetching && assignments.length ? (
              assignments.map(assignment => (
                <StyledSegment
                  key={assignment.id}
                  className={assignment.id === Number(assignmentId) ? 'selected' : ''}
                >
                  <Link to={`/assignments/${assignment.id}?page=${page}`}>
                    <Header as="h3">
                      {assignment.title}
                    </Header>
                    due {format(assignment.due_at, 'MMM DD, YYYY')}
                  </Link>
                </StyledSegment>
              ))
            ) : (
              <StyledSegment loading={fetching} />
            )
          }
        </Segment.Group>
        <Pagination
          defaultActivePage={page || 1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          onPageChange={this.fetchAssignments}
          totalPages={Math.round(total / 5)}
        />
      </Container>
    );
  }
}

injectAsyncReducer('assignments', reducer);
injectSaga('assignments', saga);

const mapStateToProps = (state, props) => ({
  assignments: selectAssignments(state),
  total: selectTotal(state),
  fetching: selectFetching(state),
  page: selectPage(state) || props.page,
})

const mapDispatchToProps = dispatch => ({
  fetchAssignments: (page) => dispatch(actions.fetchAssignments(page))
})

const ConnectedAssignments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Assignments);

export default ConnectedAssignments;
