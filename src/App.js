import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { Switch, Route, Redirect } from 'react-router-dom'

import Assignments from 'containers/Assignments';
import AssignmentDetails from 'containers/AssignmentDetails';

import 'semantic-ui-css/semantic.min.css'

const Header = styled.header`
  background-color: #282c34;
  min-height: 10vmin;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledGrid = styled(Grid)`
  margin: 15px;
`;

const RouteWithPaths = ({ paths, ...rest }) => (
  <Switch>
    {paths.map(path => (
      <Route exact key={path} path={path} {...rest}/>
    ))}
  </Switch>
)

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <p>
            Explore your assigned homework.
          </p>
        </Header>
        <RouteWithPaths
          paths={["/", "/assignments/:assignmentId"]}
          component={
            ({ match, location }) => (
              <StyledGrid
                columns="300px fit-content(100%)"
                rows="fit-content(100%)"
                gap="30px"
              >
                <Cell>
                  <Assignments
                    assignments={[{title: 'one'}, {title: 'two'}]}
                    assignmentId={match.params.assignmentId}
                    page={location.search.replace('?page=', '')}
                  />
                </Cell>
                <Cell>
                  <AssignmentDetails
                    assignmentId={match.params.assignmentId}
                  />
                </Cell>
              </StyledGrid>
            )
          }
        />
      </React.Fragment>
    );
  }
}

export default App;
