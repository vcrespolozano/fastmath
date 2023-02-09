import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { APP_GAME_MODES, APP_GAME_DIFFICULTIES } from '../../../constants/constants';
import Button from '../../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../../common/Text/Text';
import ComboBox from '../../common/ComboBox/ComboBox';

const MODES_ARR = [
  {key: APP_GAME_MODES.CLASSIC, label: 'Clásico'},
  {key: APP_GAME_MODES.CONTRARELOJ, label: 'Contrarreloj'},
  {key: APP_GAME_MODES.SIN_FALLOS, label: 'Sin fallos'},
]

const DIFFICULTIES_ARR = [
  {key: APP_GAME_DIFFICULTIES.FACIL, label: 'Fácil'},
  {key: APP_GAME_DIFFICULTIES.NORMAL, label: 'Normal'},
  {key: APP_GAME_DIFFICULTIES.DIFICIL, label: 'Difícil'},
]

const GameSelector = () => {

  const {
    theme,
    setCountDownEnabled,
    setGameStarted,
    setShowInstructions,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    setTimeUsed,
  } = useContext(GlobalContext);

  const startGame = () => {
    if (mode && difficulty) {
      setCountDownEnabled(true);
      if (mode === APP_GAME_MODES.CONTRARELOJ) {
        setTimeUsed(60);
      }
      setTimeout(setGameStarted, 4000, true);
    }
  }

  return (
    <div className={`gameSelector theme-${theme}`}>
      <Button
        label="¿Qué es FastMath?"
        width={220}
        height={55}
        onClick={() => setShowInstructions(true)}
      />
      <div className="gameSelector__mode">
        <Text
          value="Selecciona modo"
          size={TEXT_SIZE.BIG}
          weight={TEXT_WEIGHT.MEDIUM}
          kind={TEXT_KIND.PARAGRAPH}
          display={TEXT_DISPLAY.BLOCK}
          align={TEXT_ALIGN.CENTER}
          className="gameSelector__title"
        />
        <ComboBox
          options={MODES_ARR}
          handleSelect={setMode}
          id="combo_modes"
          className="gameSelector__mode_combo"
        />
      </div>
      <div className="gameSelector__difficulty">
        <Text
          value="Selecciona dificultad"
          size={TEXT_SIZE.BIG}
          weight={TEXT_WEIGHT.MEDIUM}
          kind={TEXT_KIND.PARAGRAPH}
          display={TEXT_DISPLAY.BLOCK}
          align={TEXT_ALIGN.CENTER}
          className="gameSelector__title"
        />
        <ComboBox
          options={DIFFICULTIES_ARR}
          handleSelect={setDifficulty}
          id="combo_difficulties"
          className="gameSelector__difficulty_combo"
        />
      </div>
      <Button
        label="¡Jugar!"
        width={200}
        height={55}
        onClick={startGame}
        className="gameSelector__startButton"
      />
    </div>
  )
}

export default GameSelector;