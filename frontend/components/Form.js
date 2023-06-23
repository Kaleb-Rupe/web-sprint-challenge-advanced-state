import React from "react";
import { connect } from "react-redux";
import { postQuiz, inputChange } from "../state/action-creators";

const Form = ({ postQuiz, inputChange, form }) => {
  const onChange = (evt) => {
    evt.preventDefault();
    inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    const answerForm = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer,
    };
    evt.preventDefault();
    postQuiz(answerForm);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        value={form.newQuestion}
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        value={form.newTrueAnswer}
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        value={form.newFalseAnswer}
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button
        id="submitNewQuizBtn"
        disabled={
          form.newQuestion.trim().length <= 1 ||
          form.newTrueAnswer.trim().length <= 1 ||
          form.newFalseAnswer.trim().length <= 1
        }
      >
        Submit new quiz
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

export default connect(mapStateToProps, { inputChange, postQuiz })(Form);
