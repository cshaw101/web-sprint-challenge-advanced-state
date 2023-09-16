import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { activeCogIndex, moveClockwise, moveCounterClockwise } = props;

  const cogs = Array(6).fill(''); // Initialize an array with 6 empty strings

  // Set the active cog to 'B' if it's the active cog
  if (activeCogIndex >= 0 && activeCogIndex < cogs.length) {
    cogs[activeCogIndex] = 'B';
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {cogs.map((cog, index) => (
          <div
            key={index}
            className={`cog ${index === activeCogIndex ? 'active' : ''}`}
            style={{ "--i": index }}
          >
            {cog}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={moveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCogIndex: state.wheel.activeCogIndex,
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);

//i could add a click handler to the buttons and add a dispatch to change the active class and the B
//when it goes clockwise switches to the next one after 6 it goes to 1
//when it goes counter clockwise it needs to go from 6 to 5

//possibly use a ternary to have the class change {div === activeDiv ? className="cog active" : className="cog"}