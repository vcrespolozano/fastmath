import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { APP_GAME_MODES, APP_GAME_DIFFICULTIES } from '../../../constants/constants';
import Button, { BUTTON_ICONS, BUTTON_COLOR } from '../../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
  TEXT_COLOR,
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
    setCountDownEnabled,
    setGameStarted,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    setTimeUsed,
    setShowResults,
    setShowInstructions,
    windowSize,
  } = useContext(GlobalContext);

  const [modeSelected, setModeSelected] = useState(null);
  const [difficultySelected, setDifficultySelected] = useState(null);

  useEffect(() => {
    if (mode) {
      const auxModeSelected = MODES_ARR.findIndex(modeItem => modeItem.key === mode);
      setModeSelected(auxModeSelected);
    }
  }, [mode]);
  
  useEffect(() => {
    if (difficulty) {
      const auxDifficultySelected = DIFFICULTIES_ARR.findIndex(difficultyItem => difficultyItem.key === difficulty);
      setDifficultySelected(auxDifficultySelected);
    }
  }, [difficulty]);

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
    <div className="gameSelector">
      <div className="gameSelector__mode">
        <Text
          value="Modo"
          size={TEXT_SIZE.BIG}
          weight={TEXT_WEIGHT.MEDIUM}
          kind={TEXT_KIND.PARAGRAPH}
          display={TEXT_DISPLAY.BLOCK}
          align={TEXT_ALIGN.CENTER}
          className="gameSelector__title"
          color={TEXT_COLOR.SECONDARY}
        />
        <ComboBox
          options={MODES_ARR}
          handleSelect={setMode}
          id="combo_modes"
          className="gameSelector__mode_combo"
          indexSelected={modeSelected}
          width={windowSize > 768 ? '280px' : '100%'}
        />
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
          color={TEXT_COLOR.SECONDARY}
        />
        <ComboBox
          options={DIFFICULTIES_ARR}
          handleSelect={setDifficulty}
          id="combo_difficulties"
          className="gameSelector__difficulty_combo"
          indexSelected={difficultySelected}
          width={windowSize > 768 ? '280px' : '100%'}
        />
      </div>
      <Button
        label="¡Jugar!"
        width={windowSize > 768 ? '280px' : '100%'}
        height={55}
        onClick={startGame}
        className="gameSelector__startButton"
        color={BUTTON_COLOR.SECONDARY}
      />
      <div className="gameSelector__otherButtons">
        <Button
          label="Ayuda"
          width={windowSize > 768 ? '280px' : '100%'}
          height={55}
          onClick={() => setShowInstructions(true)}
          className="gameSelector__otherButtons_button"
          icon={BUTTON_ICONS.INFO}
        />
        <Button
          label="Resultados"
          width={windowSize > 768 ? '280px' : '100%'}
          height={55}
          onClick={() => setShowResults(true)}
          className="gameSelector__otherButtons_button"
          icon={BUTTON_ICONS.SCORES}
        />
      </div>
    </div>
  )
}

export default GameSelector;