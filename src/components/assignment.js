import React from 'react';
import styled from 'styled-components';
import { Container, Header } from 'semantic-ui-react';
import { format } from 'date-fns';

const Wrapper = styled(Container)`
  margin: 15px;
  padding: 15px;
`;

const DateContainer = styled.div`
  float: right;
  margin-top: -40px;
`;

export default function({ assignment }) {
  return (
    <Wrapper>
      <Header as="h1">
        {assignment.title}
      </Header>
      <DateContainer>
        {format(assignment.due_at, 'MMM DD, YYYY')}
      </DateContainer>
      {assignment.description}
    </Wrapper>
  )
}
