import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel({ activeCogIndex, dispatch }) {
  const handleMoveClockwise = () => {
    dispatch(moveClockwise());
  };

  const handleMoveCounterClockwise = () => {
    dispatch(moveCounterClockwise());
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {Array(6)
          .fill('')
          .map((_, index) => (     
            <div
              key={index}
              className={`cog ${index === activeCogIndex ? 'active' : ''}`}
              style={{ '--i': index }}
            >
              {index === activeCogIndex ? 'B' : ''}
            </div>
          ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleMoveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleMoveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCogIndex: state.wheel.activeCogIndex,
});

export default connect(mapStateToProps)(Wheel);
