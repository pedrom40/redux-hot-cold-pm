import React from 'react';
import { shallow } from 'enzyme';
import { GuessList } from "./guess-list";

describe('<GuessList />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessList guesses={[]} />);
  });

  it('Renders a list of guesses', () => {
    const sampleGuesses = [10, 20, 30];
    const wrapper = shallow(<GuessList guesses={sampleGuesses} />)
    const items = wrapper.find('li');

    expect(items.length).toEqual(sampleGuesses.length);
    sampleGuesses.forEach( (value, index) => {
      expect(items.at(index).text()).toEqual(value.toString());
    });
  });
});