import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(index) {
  return {
    type: MOVE_CLOCKWISE,
    payload: index,
  };
}

export function moveCounterClockwise(index) {
  return {
    type: MOVE_COUNTERCLOCKWISE,
    payload: index,
  };
}

export function selectAnswer(answer_id) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer_id,
  };
}

export const setQuiz = (quiz) => ({
  type: SET_QUIZ_INTO_STATE,
  payload: quiz,
});

export const setMessage = (message) => ({
  type: SET_INFO_MESSAGE,
  payload: message,
});

export const inputChange = (input_id, value) => ({
  type: INPUT_CHANGE,
  payload: { input_id, value },
});

export const resetForm = () => ({
  type: RESET_FORM,
});

// ❗ Async action creators
export const fetchQuiz = () => (dispatch) => {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  axios
    .get("http://localhost:9000/api/quiz/next")
    .then((res) => {
      dispatch(setQuiz(res.data));
    })
    .catch((err) => console.error(err));
  // - Dispatch an action to send the obtained quiz to its state
};

export const postAnswer = (answer) => (dispatch) => {
  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz
  axios
    .post("http://localhost:9000/api/quiz/answer", answer)
    .then((res) => {
      dispatch(setMessage(res.data.message));
      dispatch(fetchQuiz());
      dispatch(selectAnswer(null));
    })
    .catch((err) => console.error(err));
};

export const postQuiz = (answerForm) => (dispatch) => {
  // On successful POST:
  axios.post("http://localhost:9000/api/quiz/new", answerForm).then(() => {
    dispatch({
      type: SET_INFO_MESSAGE,
      payload: `Congrats: "${answerForm.question_text}" is a great question!`,
    });
    dispatch(resetForm());
  });
};
// - Dispatch the correct message to the the appropriate state
// - Dispatch the resetting of the form
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
