import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Tab } from 'semantic-ui-react';

import { AssignmentsDetails, Wrapper } from 'containers/AssignmentDetails';

configure({adapter: new Adapter()});

it('renders empty message', () => {
  const container = mount(<AssignmentsDetails />);
  expect(container.find(Wrapper).text()).toEqual('Select an assignment');
});

it('renders assignment', () => {
  const assignment = {
    title: 'Assignment 1',
    due_at: new Date(),
    description: 'Description',
  };

  const container = mount(<AssignmentsDetails assignment={assignment} />);
  expect(container.find(Tab).length).toBe(1);
});
