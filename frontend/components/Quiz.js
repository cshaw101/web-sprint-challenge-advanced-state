import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, setMessage } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);

  


  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswerClick = (answerId) => {
    dispatch(selectAnswer(answerId));
    dispatch(setMessage('')); // Clear the message when an answer is clicked
  };

  

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions.answers[0].answer_id;
  
      if (isCorrect) {
        // If the selected answer is correct, dispatch a success message
        dispatch(setMessage('Nice job! That was the correct answer.'));
      } else {
        // If the selected answer is incorrect, dispatch an error message
        dispatch(setMessage('What a shame! That was the incorrect answer.'));
      }
  
      // Always dispatch the fetching of the next quiz
      dispatch(fetchQuiz());
    } else {
      dispatch(setMessage('Please select an answer before submitting.'));
    }
  };
  
  


  return (
    <div id="wrapper">
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
