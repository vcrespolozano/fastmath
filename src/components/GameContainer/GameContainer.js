import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import GameSelector from './GameSelector/GameSelector';
import Game from './Game/Game';

const GameContainer = () => {

  const {
    gameStarted,
    gameEnded,
    setGameEnded,
    setGameStarted,
    setOperationsSolved,
    setTimeUsed,
  } = useContext(GlobalContext);

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
        <GameSelector />
      )}
      {gameStarted && !gameEnded && (
        <Game
          resetFunction={() => resetGame(true)}
        />
      )}
    </div>
  );
}

export default GameContainer;
