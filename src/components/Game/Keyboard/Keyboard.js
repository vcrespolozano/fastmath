import React from 'react';
import './Keyboard.scss';

const Keyboard = ({onClick}) => {

  const operators = ['+', '-', '×', '÷'];

  return (
    <div className="keyboard">
      {
        operators.map((key, index) => {
          return (
            <span key={`keyboard-key-${index}`} className="keyboard__key" onClick={() => onClick(key)}>{key}</span>
          )
        })
      }
    </div>
  )
}

export default Keyboard;
