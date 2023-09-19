import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types';

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData };
}

export function inputChange(updatedValue) {
  return { type: INPUT_CHANGE, payload: updatedValue };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators

export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null });
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  }
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    // Send a POST request to submit the answer with quizId and answerId
    axios
      .post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId })
      .then((response) => {
        if (response.status === 200) {
          dispatch(selectAnswer(null)); 
          dispatch(fetchQuiz());
        } else {
          
          console.error('Error submitting answer:', response.statusText);
     
        }
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
        
      });
  };
}

export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
