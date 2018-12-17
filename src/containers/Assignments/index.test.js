import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { Assignments, StyledSegment } from 'containers/Assignments';

configure({adapter: new Adapter()});

it('renders assignments', () => {
  const assignments = [
    {
      id: 1,
      title: 'Assignment 1',
      due_at: new Date(),
      description: 'Description',
    },
    {
      id: 2,
      title: 'Assignment 2',
      due_at: new Date(),
      description: 'Description 2',
    }
  ];

  const options = new ReactRouterEnzymeContext();

  const container = mount(<Assignments assignments={assignments} page="1" total="20" />, options.get());
  expect(container.find(StyledSegment).length).toBe(2);
});
