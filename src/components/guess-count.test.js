import React from 'react';
import { shallow } from 'enzyme';
import GuessCount from './guess-count';
import { Provider } from 'react-redux';
import store from '../store';

describe('<GuessCount />', () => {
  it('Renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <GuessCount />
      </Provider>
    );
  });

  // it ('Renders the correct guess count', () => {
  //   const sampleCount = 10;
  //   const wrapper = shallow(<GuessCount guessCount={sampleCount} />);
  //   console.log(wrapper);
  //   expect(wrapper.text()).toEqual(`You've made ${sampleCount} guesses!`);
  // });
});