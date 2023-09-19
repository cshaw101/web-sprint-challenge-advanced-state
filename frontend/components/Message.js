import React from 'react';

export default function Message(props) {
  return (
    <div id="message">
      <p>{props.message}</p>
    </div>
  );
}