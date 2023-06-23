// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

const initialWheelState = {
  index: 0,
};
const wheel = (state = initialWheelState, { type, payload }) => {
  switch (type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        index: payload,
      };
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        index: payload,
      };
    default:
      return state;
  }
};

const initialQuizState = null;

function quiz(state = initialQuizState, { type, payload }) {
  switch (type) {
    case SET_QUIZ_INTO_STATE:
      return payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, { type, payload }) {
  switch (type) {
    case SET_SELECTED_ANSWER:
      return payload;
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, { type, payload }) {
  switch (type) {
    case SET_INFO_MESSAGE:
      return payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
function form(state = initialFormState, { type, payload }) {
  switch (type) {
    case INPUT_CHANGE:
      if (newQuestion.id === payload.input_id)
        return {
          ...state,
          newQuestion: payload.value,
        };
      if (newTrueAnswer.id === payload.input_id)
        return {
          ...state,
          newTrueAnswer: payload.value,
        };
      if (newFalseAnswer.id === payload.input_id)
        return {
          ...state,
          newFalseAnswer: payload.value,
        };
    case RESET_FORM:
      return initialFormState;
  }
  return state;
}

const reducer = combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});

export default reducer;
