import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Feed } from 'semantic-ui-react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { Submissions } from 'containers/Submissions';

configure({adapter: new Adapter()});

it('renders assignments', () => {
  const submissions = [
    {
      id: 1,
      creator: {
        avatars: {
          large: 'http://something',
        },
        last_name: 'barns',
        first_name: 'joe',
      },
      content: 'Assignment 1',
      submitted_at: new Date(),
    },
    {
      id: 2,
      creator: {
        avatars: {
          large: 'http://something',
        },
        last_name: 'barns',
        first_name: 'joe',
      },
      content: 'Assignment 1',
      submitted_at: new Date(),
    },
  ];

  const options = new ReactRouterEnzymeContext();

  const container = mount(<Submissions submissions={submissions} />, options.get());
  expect(container.find(Feed).length).toBe(2);
});
