import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types';

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage() { }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

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
          // On successful POST:
          // - Dispatch an action to reset the selected answer state
          // - Dispatch an action to set the server message to state (if applicable)
          // - Dispatch the fetching of the next quiz
          dispatch(selectAnswer(null)); // Reset selected answer
          // Handle setting the server message to state if needed
          
          // Fetch the next quiz by dispatching the fetchQuiz action
          dispatch(fetchQuiz());
        } else {
          // Handle other response statuses or errors as needed
          console.error('Error submitting answer:', response.statusText);
          // You can dispatch an action to set an error message in state here if necessary
        }
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
        // Handle other errors as needed
        // You can dispatch an action to set an error message in state here if necessary
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
