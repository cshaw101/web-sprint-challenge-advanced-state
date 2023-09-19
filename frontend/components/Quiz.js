import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, setMessage } from '../state/action-creators';
import Message from './Message';

export default function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);
  const message = useSelector((state) => state.infoMessage);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswerClick = (answerId) => {
    dispatch(selectAnswer(answerId));
    dispatch(setMessage('')); // Clear the message when an answer is clicked
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      dispatch(postAnswer(questions.quiz_id, selectedAnswer));
      // Set the selected answer as the message
      dispatch(setMessage(`Your answer: ${selectedAnswer}`));
    } else {
      dispatch(setMessage('Please select an answer before submitting.'));
    }
  };

  return (
    <div id="wrapper">
      {message && <Message message={message} />}
      {questions ? (
        <>
          <h2>{questions.question}</h2>
          <div id="quizAnswers">
            {questions.answers &&
              questions.answers.map((answer) => (
                <div
                  className={`answer ${answer.answer_id === selectedAnswer ? 'selected' : ''}`}
                  key={answer.answer_id}
                  onClick={() => handleAnswerClick(answer.answer_id)}
                >
                  {answer.text}
                  <button>
                    {answer.answer_id === selectedAnswer ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
          </div>
          <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={handleAnswerSubmit}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}
