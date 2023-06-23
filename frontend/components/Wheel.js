import React from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

const Wheel = ({ index, moveClockwise, moveCounterClockwise }) => {
  const handleClickClockwise = () => {
    moveClockwise((index + 1) % 6);
  };

  const handleClickCounterClockwise = () => {
    moveCounterClockwise((index + 5) % 6);
  };
  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`cog${idx === index ? " active" : ""}`}
            style={{ "--i": idx }}
          >
            {idx === index ? "B" : null}
          </div>
        ))}
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleClickCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClickClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    index: state.wheel.index,
  };
};

export default connect(mapStateToProps, {
  moveClockwise,
  moveCounterClockwise,
})(Wheel);
