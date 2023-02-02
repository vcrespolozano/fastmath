import React, { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/GlobalContext';

const Keyboard = ({onClick}) => {

  const { theme } = useContext(GlobalContext);

  const operators = ['+', '-', '×', '÷'];

  return (
    <div className={`keyboard theme-${theme}`}>
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
