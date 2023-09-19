// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_INFO_MESSAGE,SET_SELECTED_ANSWER, INPUT_CHANGE, RESET_FORM, ADD_QUIZ_TO_ROSTER } from './action-types'


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


export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null });

    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        console.log('Quiz data received:', res.data); 
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        
      });
  };
}

export function postAnswer(quizId, selectedAnswerId) {
  return function (dispatch) {
    
    const payload = {
      quiz_id: quizId, 
      answer_id: selectedAnswerId, 
    };

   
    axios
      .post('http://localhost:9000/api/quiz/answer', payload)
      .then((response) => {
        
        dispatch(selectAnswer(null));

        
        dispatch(setMessage('Answer submitted successfully.'));

        
        dispatch(fetchQuiz());
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
        
      });
  };
}

export function postQuiz(quizData) {
  return function (dispatch) {
    
    const payload = {
      question_text: quizData.newQuestion,
      true_answer_text: quizData.newTrueAnswer,
      false_answer_text: quizData.newFalseAnswer,
    };

    
    axios
      .post('http://localhost:9000/api/quiz/new', payload)
      .then((response) => {
        
        console.log('Response from API:', response);

        dispatch({ type: SET_INFO_MESSAGE, payload: `Congrats: "${quizData.newQuestion}" is a great question!` });
        dispatch({ type: RESET_FORM });
        dispatch({ type: ADD_QUIZ_TO_ROSTER, payload: response.data });
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
        
      });
  };
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
