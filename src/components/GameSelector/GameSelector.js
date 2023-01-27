import React, { useState } from 'react';
import { APP_GAME_MODES, APP_GAME_DIFFICULTIES } from '../../constants/constants';
import Button from '../common/Button/Button';
import './GameSelector.scss';

const GameSelector = () => {

  const [modeSelected, setModeSelected] = useState(null);
  const [difficultySelected, setDifficultySelected] = useState(null);

  const startGame = () => {
    return true;
  }

  const selectGameMode = (mode) => {
    setModeSelected(mode);
  }

  const selectDifficulty = (difficulty) => {
    setDifficultySelected(difficulty);
  }

  return (
    <div className="gameSelector">
      <div className="gameSelector__mode">
        <Button
          label="Normal"
          width={200}
          height={55}
          onClick={() => selectGameMode(APP_GAME_MODES.NORMAL)}
        />
        <Button
          label="Contrareloj"
          width={200}
          height={55}
          onClick={() => selectGameMode(APP_GAME_MODES.CONTRARELOJ)}
        />
        <Button
          label="Sin fallos"
          width={200}
          height={55}
          onClick={() => selectGameMode(APP_GAME_MODES.SIN_FALLOS)}
        />
      </div>
      <div className="gameSelector__difficulty">

      </div>
      <Button
        label="Empezar"
        width={200}
        height={55}
        onClick={startGame}
      />
    </div>
  )
}

export default GameSelector;