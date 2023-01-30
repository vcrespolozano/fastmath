import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { APP_GAME_MODES, APP_GAME_DIFFICULTIES } from '../../constants/constants';
import Button from '../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../common/Text/Text';
import Game from '../Game/Game';

const GameSelector = () => {

  const { theme, setCountDownEnabled } = useContext(GlobalContext);

  const [modeSelected, setModeSelected] = useState(null);
  const [difficultySelected, setDifficultySelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (modeSelected && difficultySelected) {
      setCountDownEnabled(true);
      setTimeout(setGameStarted, 4000, true);
    }
  }

  const selectGameMode = (mode) => {
    setModeSelected(mode);
  }

  const selectDifficulty = (difficulty) => {
    setDifficultySelected(difficulty);
  }

  return (
    <div className={`gameSelector theme-${theme}`}>
      {!gameStarted && (
        <>
          <div className="gameSelector__mode">
            <Text
              value="Modo de juego"
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.MEDIUM}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.CENTER}
              className="gameSelector__title"
              marginBottom
            />
            <div className="gameSelector__mode_buttons">
              <Button
                label="Clásico"
                width={200}
                height={55}
                onClick={() => selectGameMode(APP_GAME_MODES.CLASSIC)}
                selected={modeSelected === APP_GAME_MODES.CLASSIC}
              />
              <Button
                label="Contrareloj"
                width={200}
                height={55}
                onClick={() => selectGameMode(APP_GAME_MODES.CONTRARELOJ)}
                selected={modeSelected === APP_GAME_MODES.CONTRARELOJ}
              />
              <Button
                label="Sin fallos"
                width={200}
                height={55}
                onClick={() => selectGameMode(APP_GAME_MODES.SIN_FALLOS)}
                selected={modeSelected === APP_GAME_MODES.SIN_FALLOS}
              />
            </div>
          </div>
          <div className="gameSelector__difficulty">
            <Text
              value="Dificultad"
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.MEDIUM}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.CENTER}
              className="gameSelector__title"
              marginBottom
            />
            <div className="gameSelector__difficulty_buttons">
              <Button
                label="Fácil"
                width={200}
                height={55}
                onClick={() => selectDifficulty(APP_GAME_DIFFICULTIES.FACIL)}
                selected={difficultySelected === APP_GAME_DIFFICULTIES.FACIL}
              />
              <Button
                label="Normal"
                width={200}
                height={55}
                onClick={() => selectDifficulty(APP_GAME_DIFFICULTIES.NORMAL)}
                selected={difficultySelected === APP_GAME_DIFFICULTIES.NORMAL}
              />
              <Button
                label="Difícil"
                width={200}
                height={55}
                onClick={() => selectDifficulty(APP_GAME_DIFFICULTIES.DIFICIL)}
                selected={difficultySelected === APP_GAME_DIFFICULTIES.DIFICIL}
              />
            </div>
          </div>
          <Button
            label="Empezar"
            width={200}
            height={55}
            onClick={startGame}
          />
        </>
      )}
      {
        modeSelected
        && difficultySelected
        && gameStarted
        && (
          <Game
            mode={modeSelected}
            difficulty={difficultySelected}
          />
        )
      }
    </div>
  )
}

export default GameSelector;