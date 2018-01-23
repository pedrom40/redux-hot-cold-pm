import React from 'react';
import { shallow, mount } from 'enzyme';
import { GuessForm } from './guess-form';
import { makeGuess } from "../actions";

describe('<GuessForm />', () => {

  it('Renders without crashing', () => {
    shallow(<GuessForm />);
  });

  it('Should dispatch onMakeGuess when the form is submitted, then reset the input', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<GuessForm dispatch={dispatch} />);
    const input = wrapper.find('input[type="number"]');
    const sampleGuess = '10';

    input.instance().value = sampleGuess;
    wrapper.simulate('submit');
    expect(dispatch).toHaveBeenCalledWith(makeGuess(sampleGuess));
    expect(input.instance().value).toEqual('');
  });
});