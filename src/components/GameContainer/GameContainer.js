import { Operation } from '../Operation/Operation';
import './GameContainer.scss';

function GameContainer() {

  return (
    <div className="gameContainer">
      <Operation
        op1="5"
        op2="2"
        operator="*"
      />
    </div>
  );
}

export default GameContainer;
