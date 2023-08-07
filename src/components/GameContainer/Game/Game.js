import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { APP_GAME_MODES } from '../../../constants/constants';
import Button from '../../common/Button/Button';
import Classic from './Classic/Classic';
import TimeTrial from './TimeTrial/TimeTrial';
import Flawless from './Flawless/Flawless';
import Chain from './Chain/Chain';

const Game = ({
  resetFunction,
}) => {

  const {
    mode,
    windowSize,
    answerLight,
    setAnswerLight,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (answerLight) {
      setTimeout(() => {
        setAnswerLight(null);
      }, 500);
    }
  }, [answerLight]);

  return (
    <div className="game">
      {mode && mode === APP_GAME_MODES.CLASSIC && (
        <Classic />
      )}
      {mode && mode === APP_GAME_MODES.CONTRARELOJ && (
        <TimeTrial />
      )}
      {mode && mode === APP_GAME_MODES.SIN_FALLOS && (
        <Flawless />
      )}
      {mode && mode === APP_GAME_MODES.CADENA && (
        <Chain />
      )}
      <Button
        label="Salir"
        width={windowSize > 768 ? '280px' : '100%'}
        height={55}
        onClick={resetFunction}
      />
      <div className={`game__answerLight ${answerLight || ''}`}></div>
    </div>
  )
}

export default Game;