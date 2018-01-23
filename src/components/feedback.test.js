import React from 'react';
import {shallow} from 'enzyme';

import { Feedback } from './feedback';

describe('<Feedback />', () => {
  it('Renders without crashing', () => {
    shallow(<Feedback />);
  });
});

it('Renders some feedback', () => {
  let sampleFeedback = 'Sample feedback';

  let wrapper = shallow(<Feedback feedback={sampleFeedback} />);
  expect(wrapper.contains(sampleFeedback)).toEqual(true);
});