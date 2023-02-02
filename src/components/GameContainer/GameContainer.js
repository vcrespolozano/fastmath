import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import GameSelector from './GameSelector/GameSelector';
import Game from './Game/Game';
import GameResults from './GameResults/GameResults';

const GameContainer = () => {

  const {
    mode,
    difficulty,
    gameStarted,
    gameEnded,
    setMode,
    setDifficulty,
    setGameEnded,
    setGameStarted,
  } = useContext(GlobalContext);

  const [operationsSolved, setOperationsSolved] = useState([]);
  const [timeUsed, setTimeUsed] = useState(0);

  const resetGame = (quitting) => {
    setGameEnded(false);
    setOperationsSolved([]);
    setTimeUsed(0);
    if (quitting) {
      setGameStarted(false);
    }
  }

  return (
    <div className="gameContainer">
      {!gameStarted && !gameEnded && (
        <GameSelector
          mode={mode}
          difficulty={difficulty}
          setMode={setMode}
          setDifficulty={setDifficulty}
        />
      )}
      {gameStarted && !gameEnded && (
        <Game
          mode={mode}
          difficulty={difficulty}
          operationsSolved={operationsSolved}
          setOperationsSolved={setOperationsSolved}
          setTimeUsed={setTimeUsed}
          gameEnded={gameEnded}
          setGameEnded={setGameEnded}
          resetFunction={() => resetGame(true)}
        />
      )}
      {!gameStarted && gameEnded && (
        <GameResults
          operationsSolved={operationsSolved}
          time={timeUsed}
          mode={mode}
          difficulty={difficulty}
          resetFunction={() => resetGame(false)}
        />
      )}
    </div>
  );
}

export default GameContainer;
