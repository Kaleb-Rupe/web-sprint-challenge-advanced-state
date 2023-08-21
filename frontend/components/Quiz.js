import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectAnswer, fetchQuiz, postAnswer } from "../state/action-creators";

const Quiz = ({
  selectedAnswer,
  quiz,
  fetchQuiz,
  selectAnswer,
  postAnswer,
}) => {
  useEffect(() => {
    fetchQuiz();
  }, []);

  const answerQuestions = () => {
    const answer = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer.answer_id,
    };
    postAnswer(answer);
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            {quiz.answers.map((idx) => (
              <div
                key={idx.answer_id}
                className={`answer${
                  selectedAnswer?.answer_id === idx.answer_id ? " selected" : ""
                }`}
              >
                {idx.text}
                <button onClick={() => selectAnswer(idx)}>
                  {selectedAnswer?.answer_id === idx.answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            ))}
          </div>

          <button
            id="submitAnswerBtn"
            onClick={() => answerQuestions()}
            disabled={!selectedAnswer}
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
