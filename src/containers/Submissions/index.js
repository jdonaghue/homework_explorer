import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Container, Feed, Accordion, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

import { injectAsyncReducer, injectSaga } from 'store';
import reducer from 'containers/Submissions/reducer';
import saga from 'containers/Submissions/saga';
import * as actions from 'containers/Submissions/actions';
import { selectSubmissions, selectFetching } from 'containers/Submissions/selectors';

const Wrapper = styled(Container)`
  margin: 15px;
  padding: 15px;
`;

export class Submissions extends Component {
  state = {}

  componentDidMount() {
    if (this.props.assignmentId) {
      this.props.fetchSubmissions(this.props.assignmentId);
    }
  }

  onClick = (_, titleProps) => {
    const { submissionid } = titleProps;
    if (submissionid !== this.state.activeId) {
      this.setState({ activeId: submissionid });
    }
  }

  render() {
    const { submissions = [], fetching } = this.props;

    return (
      <Wrapper>
        {
          !fetching && submissions.length ? (
            <Accordion>
              <Segment.Group>
                {
                  submissions.map(submission => (
                    <Segment key={submission.id}>
                      <Accordion.Title
                        active={submission.id === this.state.activeId}
                        submissionid={submission.id}
                        onClick={this.onClick}
                      >
                        <Feed>
                          <Feed.Event>
                            <Feed.Label>
                              <img src={submission.creator.avatars.large} alt="blah" />
                            </Feed.Label>
                            <Feed.Content>
                              <Feed.Date>
                                Turned in on {format(submission.submitted_at, 'MMM DD, YYYY')}
                              </Feed.Date>
                              <Feed.Summary>
                                {submission.creator.first_name} {submission.creator.last_name}
                              </Feed.Summary>
                            </Feed.Content>
                          </Feed.Event>
                        </Feed>
                      </Accordion.Title>
                      <Accordion.Content active={submission.id === this.state.activeId}>
                        <code>{submission.content}</code>
                      </Accordion.Content>
                    </Segment>
                  ))
                }
              </Segment.Group>
            </Accordion>
          ) : (
            <Segment loading={fetching} />
          )
        }
      </Wrapper>
    );
  }
}

injectAsyncReducer('submissions', reducer);
injectSaga('submissions', saga);

const mapStateToProps = state => ({
  submissions: selectSubmissions(state),
  fetching: selectFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchSubmissions: (assignmentId) => dispatch(actions.fetchSubmissions(assignmentId)),
})

const ConnectedSubmissions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Submissions);

export default ConnectedSubmissions
