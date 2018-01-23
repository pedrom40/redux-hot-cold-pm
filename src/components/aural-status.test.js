import React from 'react';
import { shallow } from 'enzyme';
import { AuralStatus } from './aural-status';

describe('<AuralStatus />', () => {

  it('Renders without crashing', () => {
    shallow(<AuralStatus />);
  });

  it('Renders an aural status update', () => {
    let sampleStatus = 'You are listening to a game!';
    let wrapper = shallow(<AuralStatus auralStatus={sampleStatus} />);
    expect(wrapper.contains(sampleStatus)).toEqual(true);
  });

});