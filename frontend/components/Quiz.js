
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, selectAnswer } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswerClick = (answerId) => {
    dispatch(selectAnswer(answerId));
  };

  return (
    <div id="wrapper">
      {questions ? (
        <>
          <h2>{questions.question}</h2>
          <div id="quizAnswers">
            {questions.answers && questions.answers.map((answer) => (
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
          <button id="submitAnswerBtn" disabled={!selectedAnswer}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}
