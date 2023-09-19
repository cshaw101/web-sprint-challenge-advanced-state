import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange({ [evt.target.id]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Check if all input fields have values with more than one character
    if (
      props.form.newQuestion.trim().length > 1 &&
      props.form.newTrueAnswer.trim().length > 1 &&
      props.form.newFalseAnswer.trim().length > 1
    ) {
      // Dispatch the postQuiz action with form data
      props.postQuiz(props.form);
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      {props.infoMessage && (
        <div className="success-message">{props.infoMessage}</div>
      )}
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button
        id="submitNewQuizBtn"
        disabled={
          !(props.form.newQuestion.trim().length > 1) ||
          !(props.form.newTrueAnswer.trim().length > 1) ||
          !(props.form.newFalseAnswer.trim().length > 1)
        }
      >
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((state) => state, actionCreators)(Form);
