import { combineReducers } from 'redux';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE } from './action-types';

const initialWheelState = {
  activeCogIndex: 0, 
};

function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex + 1) % 6,
      };

    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex - 1 + 6) % 6,
      };

    default:
      return state;
  }
}


const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
    return {
      ...state,

    }
    default: 
      return state;
  }

}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
