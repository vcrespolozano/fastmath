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
  } = useContext(GlobalContext);

  const [operationsSolved, setOperationsSolved] = useState([]);
  const [timeUsed, setTimeUsed] = useState(0);

  const resetGame = () => {
    setGameEnded(false);
    setOperationsSolved([]);
    setTimeUsed(0);
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
        />
      )}
      {!gameStarted && gameEnded && (
        <GameResults
          operationsSolved={operationsSolved}
          time={timeUsed}
          mode={mode}
          difficulty={difficulty}
          resetFunction={resetGame}
        />
      )}
    </div>
  );
}

export default GameContainer;
