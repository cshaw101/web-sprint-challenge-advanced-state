import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const { form, inputChange, postQuiz } = props;

  const isFormValid = () => {
    return (
      form.newQuestion.trim().length > 1 &&
      form.newTrueAnswer.trim().length > 1 &&
      form.newFalseAnswer.trim().length > 1
    );
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange({ [id]: value, fieldValue: value, fieldName: id });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid()) {
      postQuiz(form);
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={!isFormValid()}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((state) => state, actionCreators)(Form);
