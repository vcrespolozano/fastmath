import { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { APP_GAME_MODES } from '../../../constants/constants';
import Button from '../../common/Button/Button';
import Classic from './Classic/Classic';
import TimeTrial from './TimeTrial/TimeTrial';
import Flawless from './Flawless/Flawless';

const Game = ({
  resetFunction,
}) => {

  const {
    mode,
  } = useContext(GlobalContext);

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
      <Button
        label="Salir"
        width={200}
        height={55}
        onClick={resetFunction}
      />
    </div>
  )
}

export default Game;