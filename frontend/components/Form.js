// Import necessary dependencies and action creators

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props;

  const onChange = (evt) => {
    // Dispatch an action to update the form input values
    inputChange({
      newQuestion: evt.target.id === 'newQuestion' ? evt.target.value : newQuestion,
      newTrueAnswer: evt.target.id === 'newTrueAnswer' ? evt.target.value : newTrueAnswer,
      newFalseAnswer: evt.target.id === 'newFalseAnswer' ? evt.target.value : newFalseAnswer,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Dispatch an action to post the quiz when the form is submitted
    postQuiz({ newQuestion, newTrueAnswer, newFalseAnswer });
  };

  // Calculate the disabled state of the submit button
  const isSubmitDisabled =
    newQuestion.trim().length < 2 ||
    newTrueAnswer.trim().length < 2 ||
    newFalseAnswer.trim().length < 2;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" type="submit" disabled={isSubmitDisabled}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, actionCreators)(Form);
