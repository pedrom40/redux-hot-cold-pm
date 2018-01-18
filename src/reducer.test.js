import reducer from './reducer';
import * as actions from './actions';
import {generateAuralUpdate} from "./actions";
import {makeGuess} from "./actions";

describe('reducer', () => {

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual('');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  it('Should restart the game with a new answer', () => {

    // Mess up the state a bit to simulate an existing game
    let state = {
      guesses: [10, 20, 30, 40, 50],
      feedback: 'You are ice cold',
      correctAnswer: 4
    };
    const correctAnswer = 100;
    state = reducer(state, actions.restartGame(correctAnswer));

    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toEqual(correctAnswer);
    expect(state.auralStatus).toEqual('');

  });

  it ('Should reject this answer', () => {
    let state = {
      guesses: [],
      feedback: '',
    };
    const guess = 'This is not a number';
    state = reducer(state, actions.makeGuess(guess));
    expect(state.feedback).toEqual("Please enter a valid number.");
  });

  it ('Should say "You\'re Ice Cold...', () => {
    let state = {
      guesses: [10, 20, 30],
      correctAnswer: 100,
      auralStatus: ''
    };
    const guess = 40;
    state = reducer(state, actions.makeGuess(guess));
    expect(state.guesses).toEqual([10, 20, 30, 40]);
    expect(state.feedback).toEqual("You're Ice Cold...");
    expect(state.auralStatus).toEqual('');
  });

  it ('Should say "You\'re cold..."', () => {
    let state = {
      guesses: [10, 20, 30],
      correctAnswer: 100,
      auralStatus: ''
    };
    const guess = 70;
    state = reducer(state, actions.makeGuess(guess));
    expect(state.guesses).toEqual([10, 20, 30, 70]);
    expect(state.feedback).toEqual("You're Cold...");
    expect(state.auralStatus).toEqual('');
  });

  it ('Should say "You\'re Warm."', () => {
    let state = {
      guesses: [10, 20, 30],
      correctAnswer: 100,
      auralStatus: ''
    };
    const guess = 90;
    state = reducer(state, actions.makeGuess(guess));
    expect(state.guesses).toEqual([10, 20, 30, 90]);
    expect(state.feedback).toEqual("You're Warm.");
    expect(state.auralStatus).toEqual('');
  });

  it ('Should say "You\'re Hot!"', () => {
    let state = {
      guesses: [10, 20, 30],
      correctAnswer: 100,
      auralStatus: ''
    };
    const guess = 99;
    state = reducer(state, actions.makeGuess(guess));
    expect(state.guesses).toEqual([10, 20, 30, 99]);
    expect(state.feedback).toEqual("You're Hot!");
    expect(state.auralStatus).toEqual('');
  });

  it ('Should "You got it!"', () => {
    let state = {
      guesses: [10, 20, 30],
      correctAnswer: 100,
      auralStatus: ''
    };
    const guess = 100;
    state = reducer(state, actions.makeGuess(guess));
    expect(state.guesses).toEqual([10, 20, 30, 100]);
    expect(state.feedback).toEqual("You got it!");
    expect(state.auralStatus).toEqual('');
  });

  it('Should generate a singular aural update', () => {
    let state = {
      guesses: [1],
      feedback: "You're cold...",
      correctAnswer: 100
    };
    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual("Here's the status of the game right now: You're cold... You've made 1 guess. It was: 1");
  });

  it('Should generate a plural aural update', () => {
    let state = {
      guesses: [1, 2],
      feedback: "You're cold...",
      correctAnswer: 100
    };
    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual("Here's the status of the game right now: You're cold... You've made 2 guesses. In order of most- to least-recent, they are: 2, 1");
  });

});