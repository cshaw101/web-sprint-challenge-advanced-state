// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_INFO_MESSAGE,SET_SELECTED_ANSWER, INPUT_CHANGE, RESET_FORM } from './action-types'
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
        console.log('Quiz data received:', res.data); // Log the data
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        // You can dispatch an error action here if needed
      });
  };
}

export function postAnswer(quizId, selectedAnswerId) {
  return function (dispatch) {
    // Define the payload for the answer submission
    const payload = {
      quiz_id: quizId, // Pass the quiz ID from your state
      answer_id: selectedAnswerId, // Pass the selected answer ID from your state
    };

    // Make an HTTP POST request to submit the answer
    axios
      .post('http://localhost:9000/api/quiz/answer', payload)
      .then((response) => {
        // On successful POST:
        // - Dispatch an action to reset the selected answer state
        dispatch(selectAnswer(null));

        // - Dispatch an action to set the server message to state (optional)
        dispatch(setMessage('Answer submitted successfully.'));

        // - Dispatch the fetching of the next quiz
        dispatch(fetchQuiz());
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
        // You can dispatch an error action here if needed
      });
  };
}

export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
