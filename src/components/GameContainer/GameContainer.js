import { useState } from 'react';
import { Operation } from '../Operation/Operation';
import GameSelector from '../GameSelector/GameSelector';
import './GameContainer.scss';

const GameContainer = () => {

  const [gameSelected, setGameSelected] = useState(null);

  return (
    <div className="gameContainer">
      <GameSelector />
      <Operation
        op1="5"
        op2="2"
        operator="*"
      />
    </div>
  );
}

export default GameContainer;
