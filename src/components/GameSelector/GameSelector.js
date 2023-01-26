import React from 'react';
import Button from '../common/Button/Button';

const GameSelector = () => {

  const startGame = () => {
    return true;
  }

  return (
    <div className="gameSelector">
      <div className="gameSelector__mode">

      </div>
      <div className="gameSelector__difficulty">

      </div>
      <Button
        label="Empezar"
        width={200}
        height={85}
        onClick={startGame}
      />
    </div>
  )
}

export default GameSelector;