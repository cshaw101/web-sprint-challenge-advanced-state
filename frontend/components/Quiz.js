import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  return (
    <div id="wrapper">
      {questions ? (
        <>
          <h2>{questions.question}</h2>
          <div id="quizAnswers">
            {questions.answers && questions.answers.map((answer) => (
              <div className="answer" key={answer.answer_id}>
                {answer.text}
                <button >
                  SELECTED
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn">Submit answer</button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}


// recieving the questions and answers from `[GET] http://localhost:9000/api/quiz/next`

// `[POST] http://localhost:9000/api/quiz/new`
// - Expects a payload with the following properties: `question_text`, `true_answer_text`, `false_answer_text`
// - Example of payload: `{ "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }`
// - The response to a proper request includes `201 Created` and the newly created quiz object
// - A malformed client payload will result in a `422 Unprocessable Entity` response with a reason

// - `[POST] http://localhost:9000/api/quiz/answer`
//   - Expects a payload with the following properties: `quiz_id`, `answer_id`
//   - Example of payload: `{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }`
//   - A response to a proper request includes `200 OK` and feedback on the answer